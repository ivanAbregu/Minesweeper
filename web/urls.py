"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from rest_auth.views import LogoutView, LoginView 
from rest_framework import routers

from apps.game.api.api_rest import GameViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # API
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include(router.urls)),
]
