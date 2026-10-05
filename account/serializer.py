from rest_framework import serializers
from .models import User
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile_pic']

    def get_profile_pic(self, user):
        if user.profile_pic:
            return f"{settings.SUPABASE_URL}/storage/v1/object/public/{settings.SUPABASE_STORAGE_BUCKET}/{user.profile_pic}"
        return None