from django.contrib import admin
from .models import (
    PetsAccounts,
    AdoptionApplications,
    ActiveBreedingPairs,
    InviteKeys,
    LitterHistory,
    UserAccounts,
    VetAppointments,
    UserProfile,
    MatchInteraction,
    ActiveMatch,
    PetMatchPreferences,
    ChatMessage,
)


# ==========================================
# LEGACY DATABASE MODELS (Read-Only)
# ==========================================

@admin.register(PetsAccounts)
class PetsAccountsAdmin(admin.ModelAdmin):
    list_display = ('pet_id', 'name', 'breed', 'gender', 'age', 'status', 'owner_username')
    list_filter = ('status', 'gender', 'breed')
    search_fields = ('name', 'breed', 'owner_username')
    list_per_page = 25


@admin.register(AdoptionApplications)
class AdoptionApplicationsAdmin(admin.ModelAdmin):
    list_display = ('app_id', 'applicant_name', 'pet_name', 'email', 'status', 'application_date')
    list_filter = ('status',)
    search_fields = ('applicant_name', 'pet_name', 'email')
    list_per_page = 25


@admin.register(VetAppointments)
class VetAppointmentsAdmin(admin.ModelAdmin):
    list_display = ('appt_id', 'pet_name', 'owner_name', 'vet_name', 'appt_date', 'appt_time', 'status')
    list_filter = ('status', 'vet_name')
    search_fields = ('pet_name', 'owner_name', 'vet_name')
    list_per_page = 25


@admin.register(ActiveBreedingPairs)
class ActiveBreedingPairsAdmin(admin.ModelAdmin):
    list_display = ('pair_id', 'female_pet_name', 'male_pet_name', 'pairing_date', 'status')
    list_filter = ('status',)
    search_fields = ('female_pet_name', 'male_pet_name')


@admin.register(LitterHistory)
class LitterHistoryAdmin(admin.ModelAdmin):
    list_display = ('litter_id', 'female_pet_name', 'litter_date', 'puppy_kitten_count', 'adoption_status')
    list_filter = ('adoption_status', 'status')
    search_fields = ('female_pet_name',)


@admin.register(InviteKeys)
class InviteKeysAdmin(admin.ModelAdmin):
    list_display = ('key_id', 'access_key', 'generated_by', 'is_used', 'created_at')
    list_filter = ('is_used',)
    search_fields = ('access_key', 'generated_by')


@admin.register(UserAccounts)
class UserAccountsAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'username', 'first_name', 'last_name', 'email_address', 'role')
    list_filter = ('role',)
    search_fields = ('username', 'first_name', 'last_name', 'email_address')
    list_per_page = 25


# ==========================================
# APP-MANAGED MODELS
# ==========================================

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'contact_number', 'super_treats', 'last_treat_refill')
    search_fields = ('user__username',)


@admin.register(MatchInteraction)
class MatchInteractionAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender_pet', 'receiver_pet', 'action', 'timestamp')
    list_filter = ('action',)
    search_fields = ('sender_pet__name', 'receiver_pet__name')
    list_per_page = 25


@admin.register(ActiveMatch)
class ActiveMatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet1', 'pet2', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('pet1__name', 'pet2__name')


@admin.register(PetMatchPreferences)
class PetMatchPreferencesAdmin(admin.ModelAdmin):
    list_display = ('pet', 'target_gender', 'min_age', 'max_age', 'require_vet_verified')
    list_filter = ('target_gender', 'require_vet_verified')


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'message_preview', 'timestamp', 'is_read')
    list_filter = ('is_read',)
    search_fields = ('sender', 'receiver', 'message')
    list_per_page = 50

    @admin.display(description='Message')
    def message_preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message