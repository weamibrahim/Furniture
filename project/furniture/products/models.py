from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField
# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)
    image = CloudinaryField('image', blank=True, null=True)  
