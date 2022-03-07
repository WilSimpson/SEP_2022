from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework import permissions

from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from .models import Game, Option, Question
from .utils import get_game_data

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *

from .models import Game

from django.http import HttpResponse
from rest_framework.decorators import action
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
def joinGame(request):
    '''Accepts a game code in the request
        Returns a game object or an error code
        Error Codes:
            501 - The game does not exist
            502 - The game is not active
            503 - There was some other problem'''
    try:
        game = Game.objects.get(code=int(request.data['code']))
    except Exception as e:
        return HttpResponse(status=501)
    if not game.active:
        return HttpResponse(status=502)

    try:
        game_serializer = GameSerializer(game)
        game_json = game_serializer.data

        questions = Question.objects.filter(game=game_json['id'])
        options = #A fun little algorithm here, but make sure questions work first

        ret_json = {'id':game_json['id'], 'title':game_json['title'], 'creator_id':game_json['creator_id'],
                    'code':game_json['code'], 'questions':[QuestionSerializer(question).data for question
                    in questions]}
        return Response(json.dump(ret_json))
    except Exception as e:
        return HttpResponse(status=503)


serializer_class = RoleTokenObtainPairSerializer    
    
class GameViewSet(ViewSet):
    def list(self, request):
        try:
            all_games = Game.objects.all() 
            response_data = []
            for game in all_games:
                game_data = get_game_data(game.id)
                response_data.append(game_data) 
            return Response(data=response_data)
        except Exception as e:
            return HttpResponse(status=501)
    
    def create(self, request):
        try:
            game_data = request.data
            questions = game_data['questions']
            options = game_data['options']
            question_reference = {}
            new_game = Game.objects.create(
                title       = game_data['title'], 
                active      = game_data['active'], 
                creator_id  = game_data['creator_id'], 
                code        = game_data['code'])
            for question in questions:
                new_question = Question.objects.create(
                    value       = question['value'],
                    passcode    = question['passcode'],
                    chance      = question['chance'],
                    game_id  = new_game.id
                )
                question_reference[new_question.id] = question
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
                    value               = option['value'],
                    weight              = option['weight'],
                    dest_question_id    = dest_question,
                    source_question_id  = source_question
                )
            return Response()
        except Exception as e:
            return HttpResponse(status=501)
    
    def get(self, request, pk=None):
        try:
            response_data = get_game_data(pk)
            return Response(data=response_data)
        except Exception as e:
            return HttpResponse(status=501)
    
    def update(self, request, pk=None):
        try:
            game_data = request.data
            questions = game_data['questions']
            options = game_data['options']
            Game.objects.filter(id=pk).update(
                title       = game_data['title'],
                active      = game_data['active'],
                creator_id  = game_data['creator_id'],
                code        = game_data['code']
            )
            for question in questions: 
                Question.objects.filter(id = question['id']).update(
                    value       = question['value'],
                    passcode    = question['passcode'],
                    chance      = question['chance'],
                    game_id  = question['game_id']
                )
            for option in options:
                Option.objects.filter(id=option['id']).update(
                    value               = option['value'],
                    weight              = option['weight'],
                    dest_question_id    = option['dest_question_id'],
                    source_question_id  = option['source_question_id']                    
                )            
            return Response()
        except Exception as e:
            return HttpResponse(status=501)
        
    def delete(self, request, pk):
        try:
            Game.objects.filter(id=pk).delete()
            return Response()
        except Exception as e:
            return HttpResponse(status=501)
