from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserViewSet(GenericViewSet,  # generic view functionality
                  CreateModelMixin): # handles POSTs for creation
    serializer_class = UserSerializer
    query_set = User.objects.all()