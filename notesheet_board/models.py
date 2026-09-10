from django.db import models
from accounts.models import User

# Create your models here.
class Notesheet(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)