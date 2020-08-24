from rest_framework.routers import SimpleRouter

from .views import GameViewSet

router = SimpleRouter()

router.register("game", GameViewSet)

urlpatterns = router.urls
