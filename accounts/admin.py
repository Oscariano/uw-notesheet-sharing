from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import User

# Register your models here.
# accounts/admin.py
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Profile Info', {'fields': ('avatar_url', 'bio')}),
    )