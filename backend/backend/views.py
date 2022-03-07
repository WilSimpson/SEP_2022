from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework import permissions

from django.contrib.auth import get_user_model

from .serializers import UserSerializer
from .models import Game, Option, Question
from .utils import get_game_data

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RoleTokenObtainPairSerializer

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
            question_label_reference = {}
            option_labels = []
            option_i = 0
            source_q = 1
            dest_q = 2
            new_game = Game(
                title       = game_data['title'], 
                active      = game_data['active'], 
                creator_id  = game_data['creator_id'], 
                code        = game_data['code'])
            
            for question in questions:
                new_question = Question(
                    value       = question['value'],
                    passcode    = question['passcode'],
                    chance      = question['chance']
                )
                question_label_reference[question['label']] = new_question
            for option in options:
                new_option = Option(
                    value               = option['value'],
                    weight              = option['weight']
                )
                option_labels.append([new_option, option['source_label'], option['dest_label']])
            new_game.save()
            
            for label, question in question_label_reference.items():
                question.game_id = new_game.id
                question.save()
            
            for new_option in option_labels:
                option_obj = new_option[option_i]
                for q_label, q in question_label_reference.items():
                    if q_label == new_option[source_q]:
                        option_obj.source_question_id = q.id
                    if q_label == new_option[dest_q]:
                        option_obj.dest_question_id = q.id
                option_obj.save()
                    
            return Response()
        except Exception as e:
            print(e)
            return HttpResponse(status=501)
    
    def get(self, request, pk=None):
        try:
            response_data = get_game_data(pk)
            return Response(data=response_data)
        except Exception as e:
            return HttpResponse(status=501)
    
    def update(self, request, pk=None):
        try:
            if (Game.objects.get(id=pk)):
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
            else:
                raise Exception
        except Exception as e:
            return HttpResponse(status=501)
        
    def delete(self, request, pk):
        try:
            if Game.objects.get(id=pk):
                Game.objects.filter(id=pk).delete()
            return Response()
        except Exception as e:
            return HttpResponse(status=501)