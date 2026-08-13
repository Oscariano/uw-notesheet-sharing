from django.db import models

# Create your models here.
class Notesheet(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=500)
    