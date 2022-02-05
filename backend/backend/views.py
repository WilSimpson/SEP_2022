from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserViewSet(GenericViewSet,
                  CreateAPIView): # handles POSTs for creation
    model = User
    permission_classes = [ permissions.AllowAny ]
    serializer_class = UserSerializer