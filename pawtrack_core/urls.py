from django.contrib import admin
from django.urls import path
from pets import views

urlpatterns = [

    # ==========================================
    # PAGE ROUTES (Serve HTML templates)
    # ==========================================
    path('', views.login_view, name='home_login'),
    path('login/', views.login_view, name='login'),
    path('register/', views.create_account_view, name='register'),
    path('dashboard/', views.dashboard, name='dashboard'),

    # ==========================================
    # AUTHENTICATION API
    # ==========================================
    path('api/login/', views.api_login, name='api_login'),
    path('api/register/', views.api_register, name='api_register'),
    path('api/logout/', views.logout_user, name='logout'),
    path('api/update-profile/', views.api_update_profile, name='api_update_profile'),

    # ==========================================
    # PET MANAGEMENT API
    # ==========================================
    path('api/pets/register/', views.register_pet, name='register_pet'),
    path('api/pets/move-to-bin/', views.move_to_bin, name='move_to_bin'),
    path('api/pets/restore/', views.restore_pet, name='restore_pet'),
    path('api/pets/empty-bin/', views.empty_bin, name='empty_bin'),

    # ==========================================
    # ADOPTION API
    # ==========================================
    path('api/adoption/submit/', views.submit_adoption, name='submit_adoption'),
    path('api/adoption/cancel/', views.cancel_application, name='cancel_application'),

    # ==========================================
    # VET APPOINTMENT API
    # ==========================================
    path('api/vet/book/', views.book_vet_appointment, name='book_vet_appointment'),
    path('api/vet/cancel/', views.cancel_vet_appointment, name='cancel_vet_appointment'),

    # ==========================================
    # MATCH MAKER API
    # ==========================================
    path('api/match/candidates/', views.get_match_candidates, name='get_match_candidates'),
    path('api/match/swipe/', views.record_swipe, name='record_swipe'),
    path('api/match/active/', views.get_active_matches, name='get_active_matches'),
    path('api/match/update-status/', views.update_match_status, name='update_match_status'),

    # ==========================================
    # MESSENGER API
    # ==========================================
    path('api/chat/inbox/', views.get_chat_inbox, name='get_chat_inbox'),
    path('api/chat/messages/', views.get_chat_messages, name='get_chat_messages'),
    path('api/chat/send/', views.send_chat_message, name='send_chat_message'),

    # ==========================================
    # DJANGO ADMIN
    # ==========================================
    path('admin/', admin.site.urls),
]