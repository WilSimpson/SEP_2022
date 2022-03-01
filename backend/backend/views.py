from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.http import JsonResponse, HttpResponse
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
    try:
        game = Game.objects.get(code=int(request.data['code']))
        if not game.active:
            return HttpResponse(status=502)
        serializer = JoinGameSerializer(game)
        return Response(serializer.data)
    except Exception as e:
        return HttpResponse(status=501)

@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()
    serializer = JoinGameSerializer(games, many=True)
    return Response(serializer.data)