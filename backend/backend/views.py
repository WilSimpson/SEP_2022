from urllib import response
from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework import permissions

from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from .models import Game, Option, Question

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
    
    def create(self, request):
        try:
            game_data = request.data
            questions = game_data['questions']
            options = game_data['options']
            question_reference = {}
            # create game
            new_game = Game.objects.create(
                title       = game_data['title'], 
                active      = game_data['active'], 
                creator_id  = game_data['creator_id'], 
                code        = game_data['code'])
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
                    value               = option['text'],
                    weight              = option['weight'],
                    dest_question_id    = dest_question,
                    source_question_id  = source_question
                )
            return Response()
        except Exception as e:
            return HttpResponse(status=501)
        
    def get(self, request, id=None):
        try:
            print(id)
            response_data = {}
            game = Game.objects.get(id=id)
            response_data['title'] = game.title
            response_data['creator_id'] = game.creator_id
            response_data['code'] = game.code
            response_data['active'] = game.active
            questions = []
            options = []
            all_game_questions = Question.objects.filter(game_id_id=id).all()
            for question in all_game_questions:
                q = {}
                q['id'] = question.id
                q['value'] = question.value
                q['passcode'] = question.passcode
                q['chance'] = question.chance
                q['game_id_id'] = question.game_id_id
                questions.append(q)
                all_question_options = Option.objects.filter(source_question_id=question.id).all()
                for option in all_question_options:
                    o = {}
                    o['id'] = option.id
                    o['value'] = option.value
                    o['weight'] = option.weight
                    o['dest_question_id'] = option.dest_question_id
                    o['source_question_id'] = option.source_question_id
                    options.append(o)
            response_data['questions'] = questions
            response_data['options'] = options
            return Response(data=response_data)
        except Exception as e:
            return HttpResponse(status=501)
    
    def update(self, request, id=None):
        try:
            game_data = request.data
            questions = game_data['questions']
            options = game_data['options']
            Game.objects.filter(id=id).update(
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
                    game_id_id  = question['game_id_id']
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