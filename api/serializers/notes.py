from rest_framework import serializers
from django.conf import settings
from notesheet_board.models import Notesheet

class NotesheetSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Notesheet
        fields = '__all__'

    def get_image_urls(self, obj):
        if not obj.note_pages:
            return None
        base_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/{settings.SUPABASE_STORAGE_BUCKET}/notesheets"

        return [f"{base_url}/{path}" for path in obj.note_pages]

    def get_author(self, obj):
        return obj.author.username