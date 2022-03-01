from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

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


@api_view(['POST'])
def joinGame(request):
    key = 567654
    game = Game.objects.get(code=0)
    serializer = JoinGameSerializer(game)
    return Response(serializer.data)

@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()
    serializer = JoinGameSerializer(games, many=True)
    return Response(serializer.data)