from rest_framework import routers
from .views import (
    PeopleViewSet,
    ScheduleViewSet,
    ServiceViewSet,
    ProductGroupViewSet,
    ProductViewSet,
    TreatmentViewSet,
    TreatmentItemViewSet,
)

route = routers.DefaultRouter()
route.register('peoples', PeopleViewSet)
route.register('schedules', ScheduleViewSet)
route.register('services', ServiceViewSet)
route.register('groups', ProductGroupViewSet)
route.register('products', ProductViewSet)
route.register('treatments', TreatmentViewSet)
route.register('items', TreatmentItemViewSet)

urlpatterns = route.urls
