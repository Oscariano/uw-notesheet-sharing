from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated
from django.conf import settings
from .models import Notesheet

class NotesheetSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Notesheet
        fields = '__all__'
        extra_kwargs = {
            'note_pages': {'required': False, 'default': list},
        }

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user is None or not user.is_authenticated:
            raise NotAuthenticated()
        validated_data['author'] = user
        validated_data.setdefault('note_pages', [])
        return super().create(validated_data)

    def get_image_urls(self, obj):
        if not obj.note_pages:
            return None
        base_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/{settings.SUPABASE_STORAGE_BUCKET}/notesheets"

        return [f"{base_url}/{path}" for path in obj.note_pages]

    def get_author(self, obj):
        return obj.author.username