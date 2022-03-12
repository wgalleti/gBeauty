from django.contrib import admin
from .models import (
    People,
    Schedule,
    Service,
    ProductGroup,
    Product,
    Treatment,
    TreatmentItem
)


@admin.register(People)
class PeopleAdmin(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name', 'email', 'people_type')
    list_display = ('full_name', 'email', 'people_type', 'active')


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('customer', 'professional', 'date', 'title', 'status')
    search_fields = ('customer', 'professional', 'title')
    list_filter = ('professional__first_name', 'professional__last_name', 'date', 'status')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'time_duration', 'price',)
    search_fields = ('name', 'time_duration', 'price',)


@admin.register(ProductGroup)
class ProductGroupAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filter = ('group', 'active')
    list_display = ('group', 'name', 'price', 'active',)
    search_fields = ('name', 'price',)


@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_filter = ('date', 'professional', 'status',)
    list_display = ('date', 'schedule', 'professional', 'customer', 'duration', 'status', 'cost', 'value', 'tip',)
    search_fields = (
        'professional__first_name',
        'professional__last_name',
        'customer__first_name',
        'customer__last_name',
        'cost',
        'value',
        'tip',
    )


@admin.register(TreatmentItem)
class TreatmentItemAdmin(admin.ModelAdmin):
    list_filter = ('treatment', 'product', 'service',)
    list_display = ('product', 'service', 'amount', 'cost', 'discount',)
    search_fields = ('product__name', 'service__name',)
