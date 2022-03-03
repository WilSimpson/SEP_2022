from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.contrib.auth import get_user_model
from .serializers import UserSerializer

from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RoleTokenObtainPairSerializer

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
    '''Expects an ID of the game from the frontend
        returns -- an HTTP status:
                                    200 -- The game was activated
                                    501 -- The game does not exist
                                    502 -- The game is already active
                                    503 -- There was a different problem'''
    try:
        try:
            game = Game.objects.get(id=int(request.data['id']))
        except Exception as e:
            return HttpResponse(status=501)
        if game.active:
            return HttpResponse(status=502)
        game.active = True
        game.save()
        return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(status=503)