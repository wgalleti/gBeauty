from rest_framework import serializers
from .models import (
    People,
    Schedule,
    Service,
    ProductGroup,
    Product,
    Treatment,
    TreatmentItem
)


class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProductGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGroup
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'


class TreatmentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentItem
        fields = '__all__'
