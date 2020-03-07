from django.db import models


# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)


class Stats(models.Model):
    plastic = models.FloatField()
    glass = models.FloatField()
    metal = models.FloatField()
    trash = models.FloatField()
    paper = models.FloatField()
    cardboard = models.FloatField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
