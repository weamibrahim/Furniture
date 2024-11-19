from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:  # Check if image is not None or empty
            if hasattr(instance.image, 'url'):  # Check if it's a FileField/ImageField
                 representation['image'] = instance.image.url
            else:  # Assume it's a Cloudinary URL string
                 representation['image'] = instance.image
        return representation







