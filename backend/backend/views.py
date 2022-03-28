from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import GenericViewSet, ViewSet, ModelViewSet
from rest_framework.views import APIView
from rest_framework import permissions
import rest_framework.generics
from rest_framework.mixins import ListModelMixin

from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from .models import Game, Option, Question

from .utils import *

from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from backend.serializers import CourseSerializer

from .models import Game

from django.http import HttpResponse, HttpResponseServerError
from rest_framework.decorators import action
from rest_framework.response import Response

import json
from datetime import datetime
from random import randint

import traceback


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
            500 - There was an error finding the game session'''

    try:
        game_session = GameSession.objects.get(code=int(request.data['code']))
    except:
        return HttpResponseServerError('There is no session for the game you are trying to join.')

    if not game_session.game.active:
        return HttpResponseServerError('The game is no longer active')

    try:
        game_serializer = GameSerializer(game_session.game)
        game_session_serializer = GameSessionSerializer(game_session)
        game_json = game_serializer.data
        session_json = game_session_serializer.data
        questions = Question.objects.filter(game=game_json['id'])
        options = Option.objects.filter(source_question__in=[q.id for q in questions])

        ret_json = {'id':session_json['id'], 'title':game_json['title'], 'creator_id':session_json['creator_id'],
                    'code':session_json['code'], 'timeout':session_json['timeout'], 'questions':[QuestionSerializer(question).data for question
                    in questions], 'options':[OptionSerializer(option).data for option in options]}
        return Response(ret_json, status=200)
    except Exception as e:
        return HttpResponseServerError('There was a problem accessing this game session. Please try again later.')

@api_view(['POST'])
def complete_team(request):
    try:
        try:
            team = Team.objects.get(id=request.data['team'])
        except Exception as e:
            return HttpResponseBadRequest('This team does not exist.')
        team.completed = True
        team.save()
        return Response(status=200)
    except Exception as e:
        return HttpResponseServerError('The game was not successfully saved.')

@api_view(['POST'])
def create_team(request):
    '''Accepts an object of params to create a team
        Returns a team id
        Error Codes:
            500 - Could not create a team'''          
    try:
        session = GameSession.objects.get(id=request.data['session'])
        mode = GameMode.objects.get(name=request.data['mode'])
        new_team = Team.objects.create(
                game_session = session, 
                game_mode = mode,
                guest = True if request.data['first_time'] == "yes" else False,
                size = request.data['size'],
                first_time = True if request.data['first_time'] == "yes" else False,
                completed = False)
        return Response({'id':new_team.id}, status=200)
    except Exception as e:
        return HttpResponseServerError('A team could not be created. Please try again later.')


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
                try:
                    chance_game = get_chance_game(question)
                except Exception as e:
                    return HttpResponse(status=400, content=e)
                new_question = Question(
                    value       = question['value'],
                    passcode    = question['passcode'],
                    chance      = question['chance'],
                    chance_game = chance_game
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
                game_to_update = Game.objects.get(id=pk)
                game_to_update.title       = game_data['title']
                game_to_update.active      = game_data['active']
                game_to_update.creator_id  = game_data['creator_id']
                game_to_update.code        = game_data['code']
                for question in questions: 
                    try:
                        chance_game = get_chance_game(question)
                    except Exception as e:
                        return HttpResponse(status=400, content=e)
                    question_to_update = Question.objects.get(id=question['id'])
                    question_to_update.value        = question['value']
                    question_to_update.passcode     = question['passcode']
                    question_to_update.chance       = question['chance']
                    question_to_update.game_id      = question['game_id']
                    question_to_update.chance_game  = chance_game
                    question_to_update.save()
                for option in options:
                    option_to_update = Option.objects.get(id=option['id'])
                    option_to_update.value               = option['value']
                    option_to_update.weight              = option['weight']
                    option_to_update.dest_question_id    = option['dest_question_id']
                    option_to_update.source_question_id  = option['source_question_id']   
                    option_to_update.save() 
                game_to_update.save()
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

class GameSessionAnswerViewSet(ViewSet):
    def create(self, request):
        try:
            answer_data = request.data
            try: 
                option = Option.objects.get(id=answer_data["option_id"])
                question = Question.objects.get(id=option.source_question_id)
            except Exception as e:
                return HttpResponse(status=400, content="This option does not exist.")
            try: 
                team = Team.objects.get(id=answer_data["team_id"])
            except Exception as e:
                return HttpResponse(status=400, content="This team does not exist.")
            answer = GameSessionAnswer(
                team = team,
                question_id = question.id,
                option_chosen_id = option.id
            )
            answer.save()
            return Response()
        except Exception as e:
            print (e)
            return HttpResponse(status=500)
        
@api_view(['POST'])
def toggle_active(request):
    '''Expects an ID of the game from the frontend
        returns -- an HTTP status:
                                    200 -- The game was activated
                                    500 -- There was a problem toggling the game'''
    try:
        try:
            game = Game.objects.get(id=int(request.data['id']))
        except Exception as e:
            return HttpResponseServerError('This game does not exist.')
        game.active = not game.active
        game.save()
        return HttpResponse(status=200)
    except Exception as e:
        return HttpResponseServerError('Could not update game state.')


@api_view(['POST'])
def start_session(request):
    '''Expects a game id, creator_id, notes, and a timeout(minutes)
        Returns -- A game session id and gamecode (status 200) on success
        Error -- Returns an error message (status 500)'''
    try:
        base_game = Game.objects.get(id=int(request.data['id']))
    except Exception:
        return HttpResponseServerError('You cannot create a session for a game that does not exist.')
    if not base_game.active:
        return HttpResponseServerError('You can only create sessions for active games.')
    try:
        req_creator_id = request.data['creator_id']
        req_notes = request.data['notes']
        req_timeout = int(request.data['timeout'])
        sessions = GameSession.objects.all()
        new_session = GameSession.objects.create(
            creator_id  = req_creator_id,
            game = base_game,
            start_time = datetime.now(),
            end_time = None,
            notes = req_notes,
            timeout = req_timeout,
            code = unique_random(0, 999999, [session.code for session in sessions])
        )
        return Response(data={'id':new_session.id, 'code':new_session.code}, status=200)
    except Exception:
        return HttpResponseServerError('There was a problem creating this session.')

class CourseViewSet(ModelViewSet):
    '''A view set for the course object. It expects {name: String, Department: String, Number: Int, Section: String, userId: String}
    It supports create, read, update, and delete operations using POST, GET, PUT, and DELETE respectively
    create returns -- 201 on success and 400 on failure
    read returns -- 200 on success and 404 on failure
    update returns -- 200 on success and 404 on failure
    delete returns -- 204 on success and 404 on failure'''
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
