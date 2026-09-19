from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  # Needed for the daily treat refill

class ActiveBreedingPairs(models.Model):
    pair_id = models.AutoField(primary_key=True)
    female_pet_name = models.CharField(max_length=255, blank=True, null=True)
    male_pet_name = models.CharField(max_length=255, blank=True, null=True)
    pairing_date = models.DateField(blank=True, null=True)
    expected_due_date = models.DateField(blank=True, null=True)
    litter_size_estimate = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    last_updated = models.DateTimeField(blank=True, null=True)
    female_id = models.IntegerField(blank=True, null=True)
    male_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'active_breeding_pairs'

    def __str__(self):
        return f"Pair {self.pair_id}: {self.female_pet_name} x {self.male_pet_name}"

class AdoptionApplications(models.Model):
    app_id = models.AutoField(primary_key=True)
    pet_id = models.IntegerField(blank=True, null=True)
    applicant_name = models.CharField(max_length=255, blank=True, null=True)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    contact_number = models.CharField(max_length=50, blank=True, null=True)
    dob = models.CharField(max_length=20, blank=True, null=True)
    age = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    barangay = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    residency_type = models.CharField(max_length=50, blank=True, null=True)
    has_other_pets = models.CharField(max_length=10, blank=True, null=True)
    pet_name = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    application_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'adoption_applications'

    def __str__(self):
        return f"App #{self.app_id}: {self.applicant_name} for {self.pet_name}"

class InviteKeys(models.Model):
    key_id = models.AutoField(primary_key=True)
    access_key = models.CharField(unique=True, max_length=50)
    generated_by = models.CharField(max_length=100, blank=True, null=True)
    is_used = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'invite_keys'

    def __str__(self):
        return f"Key {self.access_key} ({'Used' if self.is_used else 'Available'})"

class LitterHistory(models.Model):
    litter_id = models.AutoField(primary_key=True)
    female_pet_name = models.CharField(max_length=255, blank=True, null=True)
    litter_date = models.DateField(blank=True, null=True)
    puppy_kitten_count = models.IntegerField(blank=True, null=True)
    adoption_status = models.CharField(max_length=50, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'litter_history'

    def __str__(self):
        return f"Litter {self.litter_id}: {self.female_pet_name} ({self.litter_date})"

class PetsAccounts(models.Model):
    pet_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    age = models.CharField(max_length=50, blank=True, null=True)
    breed = models.CharField(max_length=100, blank=True, null=True)
    health_status = models.CharField(max_length=255, blank=True, null=True)
    contact_number = models.CharField(max_length=50, blank=True, null=True)
    personal_traits = models.TextField(blank=True, null=True)
    reason_for_adoption = models.TextField(blank=True, null=True)
    image = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    owner_username = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pets_accounts'

    def __str__(self):
        return f"{self.name} ({self.breed}) - {self.status}"

class UserAccounts(models.Model):
    user_id = models.AutoField(primary_key=True)
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    username = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=50, blank=True, null=True)
    email_address = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=20, blank=True, null=True)
    last_ip = models.CharField(max_length=50, blank=True, null=True)
    session_token = models.CharField(max_length=100, blank=True, null=True)
    trusted_devices = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_accounts'

    def __str__(self):
        return f"{self.first_name} {self.last_name} (@{self.username})"

class VetAppointments(models.Model):
    appt_id = models.AutoField(primary_key=True)
    pet_name = models.CharField(max_length=255, blank=True, null=True)
    owner_name = models.CharField(max_length=255, blank=True, null=True)
    vet_name = models.CharField(max_length=255, blank=True, null=True)
    appt_date = models.CharField(max_length=50, blank=True, null=True)
    appt_time = models.CharField(max_length=50, blank=True, null=True)
    booking_time = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vet_appointments'

    def __str__(self):
        return f"Appt #{self.appt_id}: {self.pet_name} with {self.vet_name}"

# =========================================================
# PROFILE & MATCH MAKER MODELS
# =========================================================

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=50, blank=True, null=True)
    
    # Match Maker: Super Treats Wallet
    super_treats = models.IntegerField(default=3) 
    last_treat_refill = models.DateField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

class MatchInteraction(models.Model):
    ACTION_CHOICES = [
        ('like', 'Like'),
        ('pass', 'Pass'),
        ('super_like', 'Super Treat')
    ]
    
    sender_pet = models.ForeignKey('PetsAccounts', on_delete=models.CASCADE, related_name='sent_interactions')
    receiver_pet = models.ForeignKey('PetsAccounts', on_delete=models.CASCADE, related_name='received_interactions')
    
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender_pet', 'receiver_pet')
        indexes = [
            models.Index(fields=['sender_pet'], name='idx_match_sender'),
        ]

class ActiveMatch(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Owner Approval'),
        ('approved', 'Approved & Messaging')
    ]
    
    pet1 = models.ForeignKey('PetsAccounts', on_delete=models.CASCADE, related_name='matches_as_pet1')
    pet2 = models.ForeignKey('PetsAccounts', on_delete=models.CASCADE, related_name='matches_as_pet2')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Match #{self.id}: {self.pet1} ↔ {self.pet2} ({self.status})"

class PetMatchPreferences(models.Model):
    pet = models.OneToOneField('PetsAccounts', on_delete=models.CASCADE, related_name='match_preferences')
    target_gender = models.CharField(max_length=10, blank=True, null=True) 
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=15)
    require_vet_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Preferences for {self.pet}"

class ChatMessage(models.Model):
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['sender', 'receiver'], name='idx_chat_participants'),
            models.Index(fields=['receiver', 'is_read'], name='idx_chat_unread'),
        ]

    def __str__(self):
        return f"{self.sender} → {self.receiver}: {self.message[:30]}"