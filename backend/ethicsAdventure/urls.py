"""ethicsAdventure URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from rest_framework.routers import DefaultRouter
from django.urls import path, re_path, include

from backend.views import GameViewSet, UserViewSet
from django.contrib.auth.models import User

from backend import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from backend.views import RoleTokenObtainPairView
from backend import views

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="user")
router.register(r'games', GameViewSet, basename='game')

urlpatterns = [
    path('api/token/', RoleTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify', TokenVerifyView.as_view(), name = 'token_verify'),
    path('api/games/startSession', views.start_session, name='start_session'),
    path('api/games/create/', GameViewSet.as_view({'post':'create'}), name='create_game'),
    re_path('^api/', include(router.urls)),
    path('admin/', admin.site.urls)
]

