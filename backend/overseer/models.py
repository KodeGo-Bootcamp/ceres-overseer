from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Lot(models.Model):
    owner = models.ForeignKey(User, models.CASCADE, default=0)
    name = models.CharField(max_length=128)
    location = models.CharField(max_length=128)
    size = models.FloatField()
    soil_type = models.CharField(max_length=32)
    note = models.CharField(max_length=256)
    planted_date = models.CharField(max_length=32)
    seed_name = models.CharField(max_length=32)
    predicted_seed_quantity = models.IntegerField()
    predicted_resilience = models.FloatField()
    predicted_harvest_date = models.CharField(max_length=32)
    predicted_daily_upkeep = models.FloatField()
    predicted_revenue = models.FloatField()
