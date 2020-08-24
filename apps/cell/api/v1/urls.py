from rest_framework.routers import SimpleRouter

from .views import CellViewSet

router = SimpleRouter()

router.register("cell", CellViewSet)

urlpatterns = router.urls
