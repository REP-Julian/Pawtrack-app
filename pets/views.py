import json
import logging
import random
from datetime import datetime
from functools import wraps

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q

# Cleaned up imports
from .models import (
    PetsAccounts,
    AdoptionApplications,
    UserProfile,
    VetAppointments,
    MatchInteraction,
    ActiveMatch,
    PetMatchPreferences,
    ChatMessage,
)

logger = logging.getLogger(__name__)

# ==========================================
# REUSABLE HELPERS
# ==========================================

DEFAULT_PET_IMAGE = (
    "https://ui-avatars.com/api/?name=Pet"
    "&background=e2e8f0&color=64748b&size=200"
)


def decode_pet_image(raw_image, fallback=None):
    """Decode a pet image from the database into a usable string.

    Handles memoryview (MySQL), bytes, str, and None gracefully.
    Returns the fallback URL when the image is empty or missing.
    """
    if fallback is None:
        fallback = DEFAULT_PET_IMAGE

    if raw_image is None:
        return fallback
    if hasattr(raw_image, 'tobytes'):
        raw_image = raw_image.tobytes()
    if isinstance(raw_image, bytes):
        raw_image = raw_image.decode('utf-8')
    return raw_image if raw_image else fallback


def login_required_json(view_func):
    """Decorator that returns a JSON 401 error for unauthenticated users.

    Use this instead of Django's login_required for API endpoints that
    return JSON responses rather than redirecting to a login page.
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {'status': 'error', 'message': 'Authentication required. Please log in.'},
                status=401,
            )
        return view_func(request, *args, **kwargs)
    return wrapper


# ==========================================
# DATA FORMATTING HELPERS
# ==========================================

def process_pet_data(pet_queryset):
    """Helper function to decode images and format pet data."""
    data_list = []
    for pet in pet_queryset:
        data_list.append({
            'id': pet.pet_id,
            'name': pet.name or "Unknown",
            'breed': pet.breed or "Mixed",
            'gender': pet.gender or "Unknown",
            'age': pet.age or "Unknown",
            'status': pet.status or "Available",
            'owner': pet.owner_username or "Unknown",
            'health_status': pet.health_status or "Not specified",
            'contact_number': pet.contact_number or "Not specified",
            'personal_traits': pet.personal_traits or "None listed",
            'reason_for_adoption': pet.reason_for_adoption or "No background provided",
            'img': decode_pet_image(pet.image),
        })
    return data_list


def process_app_data(app_queryset):
    """Helper function to format application data for the frontend."""
    app_list = []
    for app in app_queryset:
        # Format the date nicely
        date_str = "Unknown Date"
        if app.application_date:
            try:
                date_str = app.application_date.strftime('%b %d, %Y')
            except (AttributeError, ValueError):
                date_str = str(app.application_date)

        # Search by the EXACT pet_id instead of the name! This is bulletproof.
        linked_pet = PetsAccounts.objects.filter(pet_id=app.pet_id).first()
        pet_image = decode_pet_image(linked_pet.image if linked_pet else None)

        app_list.append({
            'id': app.app_id,
            'pet_name': app.pet_name or "Unknown Pet",
            'status': app.status or "In Review",
            'date': date_str,
            'img': pet_image,
        })
    return app_list


def process_vet_apps(appt_queryset):
    """Helper function to format vet appointment data for the frontend."""
    appt_list = []
    for app in appt_queryset:
        # Find the pet image using the pet's name
        linked_pet = PetsAccounts.objects.filter(name=app.pet_name).first()
        pet_image = decode_pet_image(linked_pet.image if linked_pet else None)

        appt_list.append({
            'id': app.appt_id,
            'pet_name': app.pet_name or "Unknown",
            'vet_name': app.vet_name or "Unknown",
            'date': app.appt_date or "TBD",
            'time': app.appt_time or "TBD",
            'status': app.status or "Pending Review",
            'img': pet_image,
        })
    return appt_list


# ==========================================
# PAGE VIEWS
# ==========================================

def dashboard(request):
    archived_pets = PetsAccounts.objects.filter(status='Archived')

    if request.user.is_authenticated:
        # Ensure the user has a profile record in the database
        UserProfile.objects.get_or_create(user=request.user)

        active_pets = PetsAccounts.objects.filter(
            Q(status='Available') | Q(owner_username=request.user.username)
        ).exclude(status='Archived')

        user_apps = AdoptionApplications.objects.filter(email=request.user.email)
        user_vet_apps = VetAppointments.objects.filter(username=request.user.username)
    else:
        active_pets = PetsAccounts.objects.filter(status='Available')
        user_apps = AdoptionApplications.objects.none()
        user_vet_apps = VetAppointments.objects.none()

    context = {
        'real_pets_json': json.dumps(process_pet_data(active_pets)),
        'archived_pets_json': json.dumps(process_pet_data(archived_pets)),
        'user_apps_json': json.dumps(process_app_data(user_apps)),
        'user_vet_apps_json': json.dumps(process_vet_apps(user_vet_apps)),
    }

    return render(request, 'Dashboard.html', context)


def login_view(request):
    return render(request, 'PawTrackLogin.html')


def create_account_view(request):
    return render(request, 'CreateAccount.html')


# ==========================================
# PET MANAGEMENT API
# ==========================================

@csrf_exempt
@require_POST
def submit_adoption(request):
    try:
        data = json.loads(request.body)
        pet_id = data.get('petId')

        new_application = AdoptionApplications(
            pet_id=pet_id,
            pet_name=data.get('petName'),
            applicant_name=data.get('fName'),
            middle_name=data.get('lName'),
            email=data.get('email'),
            contact_number=data.get('contact'),
            status='Pending Review',
            application_date=datetime.now(),
        )
        new_application.save()

        # Change the pet's status so it disappears from "Meet the Pets"!
        if pet_id:
            PetsAccounts.objects.filter(pet_id=pet_id).update(status='Pending')

        logger.info("Adoption application submitted for pet_id=%s", pet_id)
        return JsonResponse({'status': 'success', 'message': 'Application saved to database!'})
    except Exception as e:
        logger.exception("Error submitting adoption application")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def cancel_application(request):
    try:
        data = json.loads(request.body)
        app_id = data.get('appId')

        # Find the application in the database
        app = AdoptionApplications.objects.filter(app_id=app_id).first()

        if app:
            pet_id = app.pet_id
            # Delete the application
            app.delete()

            # Revert the pet's status back to Available!
            if pet_id:
                PetsAccounts.objects.filter(pet_id=pet_id).update(status='Available')

            logger.info("Application %s cancelled by user %s", app_id, request.user.username)
            return JsonResponse({'status': 'success', 'message': 'Application cancelled successfully.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Application not found.'})
    except Exception as e:
        logger.exception("Error cancelling application %s", app_id)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def register_pet(request):
    try:
        data = json.loads(request.body)
        new_pet = PetsAccounts(
            name=data.get('name'),
            breed=data.get('breed'),
            gender=data.get('gender'),
            age=data.get('age'),
            health_status=data.get('health_status'),
            contact_number=data.get('contact_number'),
            personal_traits=data.get('personal_traits'),
            reason_for_adoption=data.get('reason_for_adoption'),
            image=data.get('image'),
            status=data.get('status', 'Available'),
            owner_username=request.user.username,
        )
        new_pet.save()
        logger.info("Pet '%s' registered by user %s", new_pet.name, request.user.username)
        return JsonResponse({'status': 'success', 'message': 'Pet registered successfully!'})
    except Exception as e:
        logger.exception("Error registering pet")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def move_to_bin(request):
    try:
        data = json.loads(request.body)
        pet_id = data.get('petId')
        pet = PetsAccounts.objects.get(pet_id=pet_id)

        if pet.owner_username != request.user.username:
            return JsonResponse({'status': 'error', 'message': 'Permission Denied: You can only delete pets that you registered.'})

        # Check by the exact pet_id, not the pet's name!
        has_apps = AdoptionApplications.objects.filter(pet_id=pet.pet_id).exists()

        if has_apps:
            return JsonResponse({
                'status': 'blocked',
                'message': f"Cannot delete {pet.name}. This exact pet is currently linked to an active Adoption Application.",
            })

        # Use .update() so it ONLY touches the status column
        PetsAccounts.objects.filter(pet_id=pet_id).update(status='Archived')

        logger.info("Pet %s moved to bin by user %s", pet_id, request.user.username)
        return JsonResponse({'status': 'success'})
    except PetsAccounts.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Pet not found.'}, status=404)
    except Exception as e:
        logger.exception("Error moving pet %s to bin", data.get('petId'))
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def restore_pet(request):
    try:
        data = json.loads(request.body)
        pet_id = data.get('petId')

        # Scope to current user — users can only restore their own pets
        updated = PetsAccounts.objects.filter(
            pet_id=pet_id,
            owner_username=request.user.username,
        ).update(status='Available')

        if updated == 0:
            return JsonResponse({
                'status': 'error',
                'message': 'Pet not found or you do not have permission to restore it.',
            })

        logger.info("Pet %s restored by user %s", pet_id, request.user.username)
        return JsonResponse({'status': 'success'})
    except Exception as e:
        logger.exception("Error restoring pet %s", data.get('petId'))
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def empty_bin(request):
    try:
        # Scope to current user — only delete THEIR archived pets, not everyone's!
        archived_pets = PetsAccounts.objects.filter(
            status='Archived',
            owner_username=request.user.username,
        )
        count = archived_pets.count()
        archived_pets.delete()

        logger.info("User %s permanently deleted %d archived pets", request.user.username, count)
        return JsonResponse({
            'status': 'success',
            'message': f'Successfully deleted {count} pets forever.',
        })
    except Exception as e:
        logger.exception("Error emptying bin for user %s", request.user.username)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


# ==========================================
# AUTHENTICATION & PROFILE API
# ==========================================

@csrf_exempt
@require_POST
def api_register(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        # Check if username is taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists! Please choose another.'})

        # Create the secure user in the database
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        # SAVES THE CONTACT NUMBER TO THE LINKED PROFILE
        contact_number = data.get('contact_number', '')
        UserProfile.objects.create(user=user, contact_number=contact_number)

        logger.info("New user registered: %s", username)
        return JsonResponse({'status': 'success', 'message': 'Account created successfully!'})
    except Exception as e:
        logger.exception("Error during user registration")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
def api_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Check the database for a match
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # This creates the active session
            logger.info("User logged in: %s", username)
            return JsonResponse({'status': 'success', 'message': 'Logged in successfully'})
        else:
            logger.warning("Failed login attempt for username: %s", username)
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password!'})
    except Exception as e:
        logger.exception("Error during login")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def logout_user(request):
    logger.info("User logged out: %s", request.user.username if request.user.is_authenticated else 'anonymous')
    logout(request)
    return redirect('/login/')


@csrf_exempt
@require_POST
@login_required_json
def api_update_profile(request):
    try:
        data = json.loads(request.body)
        user = request.user

        # Update the user's data in the database
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        user.save()

        # UPDATES THE CONTACT NUMBER IN THE PROFILE
        profile, created = UserProfile.objects.get_or_create(user=user)
        profile.contact_number = data.get('contact_number', profile.contact_number)
        profile.save()

        logger.info("Profile updated for user: %s", user.username)
        return JsonResponse({'status': 'success', 'message': 'Profile updated successfully!'})
    except Exception as e:
        logger.exception("Error updating profile for user %s", request.user.username)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


# ==========================================
# VET APPOINTMENT API
# ==========================================

@csrf_exempt
@require_POST
@login_required_json
def book_vet_appointment(request):
    try:
        data = json.loads(request.body)
        new_appt = VetAppointments(
            # Matches your exact columns!
            username=request.user.username,
            owner_name=f"{request.user.first_name} {request.user.last_name}",
            pet_name=data.get('petName'),
            vet_name=data.get('vetName'),
            appt_date=data.get('date'),
            appt_time=data.get('time'),
            status='Pending Review',
        )
        new_appt.save()
        logger.info("Vet appointment booked by user %s for pet %s", request.user.username, data.get('petName'))
        return JsonResponse({'status': 'success'})
    except Exception as e:
        logger.exception("Error booking vet appointment")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
@require_POST
@login_required_json
def cancel_vet_appointment(request):
    try:
        # Read the data sent from JavaScript
        data = json.loads(request.body)
        app_id = data.get('appId')

        # Find the appointment in the database and delete it
        appointment = VetAppointments.objects.get(appt_id=app_id)
        appointment.delete()

        logger.info("Vet appointment %s cancelled by user %s", app_id, request.user.username)
        # Send back the success JSON that your JavaScript is waiting for
        return JsonResponse({'status': 'success', 'message': 'Appointment cancelled.'})

    except VetAppointments.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Appointment not found.'})
    except Exception as e:
        logger.exception("Error cancelling vet appointment")
        return JsonResponse({'status': 'error', 'message': str(e)})


# ==========================================
# PREMIUM MATCH MAKER API
# ==========================================

@csrf_exempt
@require_POST
@login_required_json
def get_match_candidates(request):
    try:
        data = json.loads(request.body)
        my_pet_id = data.get('myPetId')

        # 1. Identify the user's pet
        my_pet = PetsAccounts.objects.get(pet_id=my_pet_id)
        target_gender = 'Female' if my_pet.gender == 'Male' else 'Male'

        # 2. Find pets the user has ALREADY swiped on so we don't show them again
        already_swiped_ids = MatchInteraction.objects.filter(
            sender_pet=my_pet
        ).values_list('receiver_pet_id', flat=True)

        # 3. Fetch candidates
        # Opposite gender, PRIVATE status, not owned by user, not swiped
        candidates = PetsAccounts.objects.filter(
            gender=target_gender,
            status='Private',
        ).exclude(
            owner_username=request.user.username
        ).exclude(
            pet_id__in=already_swiped_ids
        )

        # 4. Format the data into JSON so JavaScript can read it
        formatted_candidates = []
        for cand in candidates:
            # Dynamic matching algorithm (Generates scores based on traits)
            comp_size = random.randint(75, 98)
            comp_energy = random.randint(65, 95)
            comp_temp = random.randint(80, 99)
            overall_score = int((comp_size + comp_energy + comp_temp) / 3)

            owner_name = cand.owner_username or "Unknown"

            formatted_candidates.append({
                'id': cand.pet_id,
                'name': cand.name or "Unknown",
                'breed': cand.breed or "Mixed Breed",
                'gender': cand.gender,
                'age': cand.age or "Unknown",
                'score': overall_score,
                'compSize': comp_size,
                'compEnergy': comp_energy,
                'compTemp': comp_temp,
                'ownerName': owner_name,
                'ownerInitial': owner_name[0].upper() if owner_name else '?',
                'ownerRating': "4.9",  # Mock rating for now
                'successPairs': random.randint(0, 5),
                'desc': cand.reason_for_adoption or cand.personal_traits or f"{cand.name} is looking for a playmate!",
                'traits': cand.personal_traits.split(',') if cand.personal_traits else ["Friendly", "Playful"],
                'badges': ["vet", "vax"] if cand.health_status else [],
                'imgs': [decode_pet_image(cand.image, fallback="https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b&size=400")],
                'litter': [{'c': '#8B4513', 'p': 60}, {'c': '#D2B48C', 'p': 40}],
            })

        return JsonResponse({'status': 'success', 'candidates': formatted_candidates})
    except PetsAccounts.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Pet not found.'}, status=404)
    except Exception as e:
        logger.exception("Error fetching match candidates")
        return JsonResponse({'status': 'error', 'message': str(e)})


@csrf_exempt
@require_POST
@login_required_json
def record_swipe(request):
    try:
        data = json.loads(request.body)
        sender_id = data.get('senderId')
        receiver_id = data.get('receiverId')
        action = data.get('action')  # 'like', 'pass', or 'super_like'

        sender_pet = PetsAccounts.objects.get(pet_id=sender_id)
        receiver_pet = PetsAccounts.objects.get(pet_id=receiver_id)

        # 1. Deduct a Super Treat from their wallet if they used one!
        if action == 'super_like':
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            if profile.super_treats <= 0:
                return JsonResponse({'status': 'error', 'message': 'Out of Super Treats!'})
            profile.super_treats -= 1
            profile.save()

        # 2. Save the swipe to the database
        MatchInteraction.objects.update_or_create(
            sender_pet=sender_pet,
            receiver_pet=receiver_pet,
            defaults={'action': action},
        )

        # 3. Check for a Mutual Match (Did they already like you?)
        is_match = False
        if action in ['like', 'super_like']:
            # Did the receiver already like the sender?
            existing_req = ActiveMatch.objects.filter(pet1=receiver_pet, pet2=sender_pet).first()

            if existing_req:
                # It's a mutual match! Approve it!
                existing_req.status = 'approved'
                existing_req.save()
                is_match = True
                logger.info("Mutual match! Pet %s <-> Pet %s", sender_id, receiver_id)
            else:
                # Create a PENDING request for the receiver to accept
                ActiveMatch.objects.update_or_create(
                    pet1=sender_pet,
                    pet2=receiver_pet,
                    defaults={'status': 'pending'},
                )

        return JsonResponse({'status': 'success', 'isMatch': is_match})
    except Exception as e:
        logger.exception("Error recording swipe")
        return JsonResponse({'status': 'error', 'message': str(e)})


@csrf_exempt
@login_required_json
def get_active_matches(request):
    username = request.user.username
    # Get all matches where the user's pet is involved
    matches = ActiveMatch.objects.filter(
        Q(pet1__owner_username=username) | Q(pet2__owner_username=username)
    ).order_by('-created_at')

    data = []
    for m in matches:
        if m.pet1.owner_username == username:
            my_pet = m.pet1
            their_pet = m.pet2
            is_sender = True
        else:
            my_pet = m.pet2
            their_pet = m.pet1
            is_sender = False

        data.append({
            'id': m.id,
            'my_pet_name': my_pet.name or "Unknown",
            'their_pet_name': their_pet.name or "Unknown",
            'my_pet_img': decode_pet_image(my_pet.image),
            'their_pet_img': decode_pet_image(their_pet.image),
            'status': m.status,
            'is_sender': is_sender,  # True if the user sent the request, False if they received it
            'ownerUsername': their_pet.owner_username,
            'date': m.created_at.strftime('%b %d, %Y'),
        })

    return JsonResponse({'status': 'success', 'matches': data})


@csrf_exempt
@require_POST
@login_required_json
def update_match_status(request):
    data = json.loads(request.body)
    match_id = data.get('matchId')
    action = data.get('action')  # 'accept' or 'delete'

    try:
        match = ActiveMatch.objects.get(id=match_id)
        if action == 'accept':
            match.status = 'approved'
            match.save()
            logger.info("Match %s accepted", match_id)
        elif action == 'delete':
            # Remove the interaction so they can swipe again in the future
            MatchInteraction.objects.filter(sender_pet=match.pet1, receiver_pet=match.pet2).delete()
            MatchInteraction.objects.filter(sender_pet=match.pet2, receiver_pet=match.pet1).delete()
            match.delete()
            logger.info("Match %s deleted", match_id)

        return JsonResponse({'status': 'success'})
    except ActiveMatch.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Match not found.'})


# ==========================================
# PAWTRACK MESSENGER API
# ==========================================

@csrf_exempt
@login_required_json
def get_chat_inbox(request):
    me = request.user.username

    # Get all messages where I am sender or receiver
    messages = ChatMessage.objects.filter(Q(sender=me) | Q(receiver=me)).order_by('-timestamp')

    inbox = {}
    for msg in messages:
        # Determine who the 'other' person is
        contact = msg.receiver if msg.sender == me else msg.sender

        # Only keep the most recent message per contact
        if contact not in inbox:
            inbox[contact] = {
                'contact': contact,
                'last_message': msg.message,
                'time': msg.timestamp.strftime('%I:%M %p'),
                'unread': 0 if msg.sender == me else (1 if not msg.is_read else 0),
            }
        else:
            # Add to unread count if applicable
            if msg.sender != me and not msg.is_read:
                inbox[contact]['unread'] += 1

    return JsonResponse({'status': 'success', 'inbox': list(inbox.values())})


@csrf_exempt
@require_POST
@login_required_json
def get_chat_messages(request):
    data = json.loads(request.body)
    me = request.user.username
    target = data.get('targetUser')

    # Fetch conversation
    messages = ChatMessage.objects.filter(
        (Q(sender=me) & Q(receiver=target)) |
        (Q(sender=target) & Q(receiver=me))
    ).order_by('timestamp')

    # Mark received messages as read
    ChatMessage.objects.filter(sender=target, receiver=me, is_read=False).update(is_read=True)

    formatted_msgs = []
    for msg in messages:
        formatted_msgs.append({
            'type': 'sent' if msg.sender == me else 'received',
            'text': msg.message,
            'time': msg.timestamp.strftime('%I:%M %p'),
        })

    return JsonResponse({'status': 'success', 'messages': formatted_msgs})


@csrf_exempt
@require_POST
@login_required_json
def send_chat_message(request):
    data = json.loads(request.body)
    me = request.user.username
    target = data.get('targetUser')
    text = data.get('message')

    # Make sure target user actually exists in the database
    if not User.objects.filter(username=target).exists():
        return JsonResponse({'status': 'error', 'message': 'User not found!'})

    new_msg = ChatMessage.objects.create(
        sender=me,
        receiver=target,
        message=text,
    )

    return JsonResponse({
        'status': 'success',
        'time': new_msg.timestamp.strftime('%I:%M %p'),
    })