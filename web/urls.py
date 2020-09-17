from django.contrib import admin
from django.urls import include, path
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny

# from rest_auth.views import LogoutView, LoginView

urlpatterns = (
    path("admin/", admin.site.urls),
    # API
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/rest-auth/registration/", include("rest_auth.registration.urls")),
    path("api/v1/", include("apps.game.api.v1.urls")),
    path("api/v1/", include("apps.cell.api.v1.urls")),
    path(
        "api/docs/",
        include_docs_urls(
            title="API Doc Mineweeper",
            description="Status code: http://www.django-rest-framework.org/api-guide/status-codes/",
            public=True,
            permission_classes=[AllowAny],
        ),
    ),
)
