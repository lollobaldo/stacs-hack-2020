from django.db import models


# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=50)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Stats

    plastic = models.FloatField(blank=True, null=True)
    glass = models.FloatField(blank=True, null=True)
    metal = models.FloatField(blank=True, null=True)
    trash = models.FloatField(blank=True, null=True)
    paper = models.FloatField(blank=True, null=True)
    cardboard = models.FloatField(blank=True, null=True)

    score = models.FloatField(blank=True, null=True)

    class Meta:
        ordering = ['username']



