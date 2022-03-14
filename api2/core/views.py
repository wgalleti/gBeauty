from rest_framework import viewsets, response
from rest_framework.decorators import action

from uteis.helpers import choice_to_list
from .models import (
    People,
    Schedule,
    Service,
    ProductGroup,
    Product,
    Treatment,
    TreatmentItem
)

from .serializers import (
    PeopleSerializer,
    ScheduleSerializer,
    ServiceSerializer,
    ProductGroupSerializer,
    ProductSerializer,
    TreatmentSerializer,
    TreatmentItemSerializer,
)


class PeopleViewSet(viewsets.ModelViewSet):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer
    filter_fields = ('id', 'people_type', 'first_name', 'last_name',)

    @action(methods=['get'], detail=False)
    def types(self, request, pk=None):
        return response.Response(choice_to_list(People.PEOPLE_TYPE))


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ProductGroupViewSet(viewsets.ModelViewSet):
    queryset = ProductGroup.objects.all()
    serializer_class = ProductGroupSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class TreatmentViewSet(viewsets.ModelViewSet):
    queryset = Treatment.objects.all().order_by('-pk')
    serializer_class = TreatmentSerializer

    @action(methods=['get'], detail=False)
    def status(self, request, pk=None):
        return response.Response(choice_to_list(Treatment.STATUS))


class TreatmentItemViewSet(viewsets.ModelViewSet):
    queryset = TreatmentItem.objects.all()
    serializer_class = TreatmentItemSerializer
    filter_fields = ('treatment', 'id')
