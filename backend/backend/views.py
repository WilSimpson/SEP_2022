from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions

from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from .models import Game, Option, Question

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RoleTokenObtainPairSerializer

from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json


class UserViewSet(GenericViewSet,
                  CreateAPIView): # handles POSTs for creation
    model = get_user_model()
    permission_classes = [ permissions.AllowAny ]
    serializer_class = UserSerializer

class RoleTokenObtainPairView(TokenObtainPairView):
    serializer_class = RoleTokenObtainPairSerializer
    
    
@api_view(['POST'])
def create_game(request):
    try:
        game_data = request.data
        print(game_data['title'])
        questions = game_data['questions']
        options = game_data['options']
        question_reference = {}
        # create game
        new_game = Game.objects.create(
            title       =game_data['title'], 
            active      =game_data['active'], 
            creator_id  =game_data['creator_id'], 
            code        =game_data['code'])
        # create questions
        for question in questions:
            new_question = Question.objects.create(
                value       = question['text'],
                passcode    = question['pass'],
                chance      = question['chance'],
                game_id_id  = new_game.id
            )
            question_reference[new_question.id] = question
        # create options
        for option in options:
            source_label = option['source_label']
            dest_label = option['dest_label']
            source_question, dest_question = None, None
            for q_id, q in question_reference.items():
                if q['label'] == source_label:
                     source_question = q_id
                if q['label'] == dest_label:
                    dest_question = q_id 
                if (source_question != None) and (dest_question != None):
                    break
            Option.objects.create(
                value = option['text'],
                weight = option['weight'],
                dest_question_id = dest_question,
                source_question_id = source_question
            )
        return Response()
    except Exception as e:
        print(e)
        return HttpResponse(status=501)