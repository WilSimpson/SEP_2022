from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.contrib.auth import get_user_model
from .serializers import UserSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RoleTokenObtainPairSerializer, JoinGameSerializer

from .models import Game

class UserViewSet(GenericViewSet,
                  CreateAPIView): # handles POSTs for creation
    model = get_user_model()
    permission_classes = [ permissions.AllowAny ]
    serializer_class = UserSerializer

class RoleTokenObtainPairView(TokenObtainPairView):
    serializer_class = RoleTokenObtainPairSerializer


class JoinGame(GenericViewSet,
                CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = JoinGameSerializer