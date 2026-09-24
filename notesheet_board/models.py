from django.db import models
from account.models import User
from django.conf import settings

# Create your models here.
class Notesheet(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=500)
    year = models.PositiveSmallIntegerField(default=settings.CURRENT_YEAR)
    quarter = models.CharField(max_length=8, default=settings.CURRENT_QUARTER)
    view_count = models.PositiveIntegerField(default=0)
    saved_count = models.PositiveIntegerField(default=0)
    download_count = models.PositiveIntegerField(default=0)
    note_pages = models.JSONField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
