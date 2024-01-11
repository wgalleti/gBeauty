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
    full_name = serializers.SerializerMethodField("_full_name")

    def _full_name(self, data):
        return data.full_name

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
    cost = serializers.SerializerMethodField('_cost')

    def _cost(self, data):
        return data.cost

    class Meta:
        model = Treatment
        fields = '__all__'


class TreatmentItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField('_total')

    def _total(self, data):
        return data.total

    class Meta:
        model = TreatmentItem
        fields = '__all__'
