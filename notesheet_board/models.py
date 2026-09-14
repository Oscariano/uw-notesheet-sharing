from django.db import models
from accounts.models import User
from django.conf import settings

# Create your models here.
class Notesheet(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=500)
    year = models.PositiveSmallIntegerField(default=settings.CURRENT_YEAR)
    quarter = models.CharField(max_length=8, default=settings.CURRENT_QUARTER)
    saved_count = models.PositiveIntegerField(default=0)
    note_pages = models.JSONField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
