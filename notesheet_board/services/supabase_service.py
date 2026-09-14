from supabase import create_client, Client
from django.conf import settings

class SupabaseClient:
    def __init__(self):
        self._client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    def get_from_bucket(self, path, ):
        data = (self._client.storage.from_('media').list('notesheets', {
            "limit": 1,
        }))
        return data