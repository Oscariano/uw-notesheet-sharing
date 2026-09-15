from rest_framework.routers import DefaultRouter
from .views import NotesheetViewSet

router = DefaultRouter()
router.register(r'', NotesheetViewSet, basename='notesheet')

urlpatterns = router.urls