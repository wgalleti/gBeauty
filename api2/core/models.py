from django.db import models


class People(models.Model):
    TYPE_PROFESSIONAL = 0
    TYPE_CUSTOMER = 1

    PEOPLE_TYPE = (
        (0, 'Professional'),
        (1, 'Customer')
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    document_id = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    people_type = models.IntegerField(choices=PEOPLE_TYPE, default=TYPE_CUSTOMER)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Schedule(models.Model):
    STATUS_SCHEDULED = 0
    STATUS_IN_SERVICE = 1
    STATUS_FINISHED = 2
    STATUS_CANCELED = 3

    STATUS = (
        (STATUS_SCHEDULED, 'Scheduled'),
        (STATUS_IN_SERVICE, 'In Service'),
        (STATUS_FINISHED, 'Finished'),
        (STATUS_CANCELED, 'Canceled'),
    )

    customer = models.ForeignKey('core.People', on_delete=models.DO_NOTHING, related_name='schedule_customer')
    professional = models.ForeignKey('core.People',
                                     on_delete=models.DO_NOTHING,
                                     related_name='schedule_professional',
                                     null=True,
                                     blank=True)
    date = models.DateTimeField()
    title = models.CharField(max_length=100)
    note = models.TextField()
    status = models.IntegerField(choices=STATUS, default=STATUS_SCHEDULED)

    def __str__(self):
        return f'{self.date} + {self.customer}'


class Service(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    time_duration = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class ProductGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    group = models.ForeignKey('core.ProductGroup', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Treatment(models.Model):
    STATUS_IN_SERVICE = 1
    STATUS_FINISHED = 2

    STATUS = (
        (STATUS_IN_SERVICE, 'In Service'),
        (STATUS_FINISHED, 'Finished'),
    )
    date = models.DateTimeField(auto_now_add=True)
    schedule = models.ForeignKey('core.Schedule', on_delete=models.DO_NOTHING, null=True, blank=True)
    professional = models.ForeignKey('core.People', on_delete=models.DO_NOTHING, related_name='treatment_professional')
    customer = models.ForeignKey('core.People', on_delete=models.DO_NOTHING, related_name='treatment_customer')
    duration = models.IntegerField(null=True, blank=True)
    status = models.IntegerField(choices=STATUS, default=STATUS_IN_SERVICE)
    cost = models.DecimalField(max_digits=15, decimal_places=2, default=0, blank=True)
    value = models.DecimalField(max_digits=15, decimal_places=2, default=0, blank=True)
    tip = models.DecimalField(max_digits=15, decimal_places=2, default=0, blank=True)

    def __str__(self):
        return f'{self.pk}'


class TreatmentItem(models.Model):
    treatment = models.ForeignKey('core.Treatment', on_delete=models.CASCADE)
    product = models.ForeignKey('core.Product', on_delete=models.DO_NOTHING, null=True, blank=True)
    service = models.ForeignKey('core.Service', on_delete=models.DO_NOTHING, null=True, blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    cost = models.DecimalField(max_digits=15, decimal_places=2)
    discount = models.DecimalField(max_digits=15, decimal_places=2)

    @property
    def total(self):
        return self.amount * self.cost - self.discount
