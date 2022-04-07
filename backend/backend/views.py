from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import GenericViewSet, ViewSet, ModelViewSet
from rest_framework.views import APIView
from rest_framework import permissions
import rest_framework.generics
from rest_framework.mixins import ListModelMixin

from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from rest_framework.decorators import api_view, renderer_classes
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

from backend.utils import get_time_for_answer

from rest_framework_csv.renderers import CSVRenderer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

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
    '''
    Accepts a ```Game``` ```code``` in the request to retrieve game session information and return to requestor.
        Returns a game object or an error code
    
    **Example request**:
        
    .. code-block:: http
            
        POST  /api/games/joinGame/
        
    .. code-block:: json

        {
            "code": (integer)
        }
    
    **Example response**:
        
    .. code-block:: json
    
        {
            "id": (id),
            "title": "",
            "creator_id": (id),
            "code": 123456,
            "timeout": (integer),
            "questions": [
                {
                    "id": 209,
                    "value": "Ignore Result",
                    "passcode": "123456",
                    "chance": false,
                    "game_id": 22,
                    "chance_game": "NO_GAME"
                    "help": [{"title": "Hint 1",
                            "body": "This is some help for the question"}]
                }
            ],
            "options": [
                {
                    "id": 180,
                    "value": "Ignore Crash",
                    "weight": 1,
                    "dest_question_id": 210,
                    "source_question_id": 209
                }
            ]
        }
        
    **Response Codes**:
    
    .. code-block:: http
    
        200 : Success
        500 : Fail
    '''

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
        questions = [QuestionSerializer(question).data for question
                    in Question.objects.filter(game=game_json['id'])]
        for question in questions:
            # We are going to add an array of help objects directly to the question
            contexts = ContextHelp.objects.filter(questions__in=[question["id"]])
            serializer = ContextHelpSerializer(contexts, many=True)
            question["help"] = serializer.data
        options = Option.objects.filter(source_question__in=[q["id"] for q in questions])
        ret_json = {'id':session_json['id'], 'title':game_json['title'], 'creator_id':session_json['creator_id'],
                    'code':session_json['code'], 'timeout':session_json['timeout'], 'questions':questions, 'options':[OptionSerializer(option).data for option in options]}
        return Response(ret_json, status=200)
    except Exception as e:
        print(e)
        return HttpResponseServerError('There was a problem accessing this game session. Please try again later.')

@api_view(['POST'])
def complete_team(request):
    """
    Changes field ```complete``` in ```Team``` model to ```True```. Envoke as a team finishes a game.
    
    
    **Example request**:
        
    .. code-block:: http
            
        POST  /api/teams/complete/
            
    .. code-block:: json
    
        {
            "team": 1
        }   
            
    **Response Codes**:
        
    .. code-block:: http
        
        200 : Success
        400 : Fail (This team does not exist.)
        500 : Fail 
    """
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
    '''
    Accepts an object of params to create a ```Team```
        
    **Example request**:
        
    .. code-block:: http
            
        POST  /api/teams/createTeam/
        
    .. code-block:: json
    
        {
            "session": (id)
            "mode": ""
            "guest": (boolean),
            "size": (integer),
            "first_time": (boolean)
        }
        
    **Example response**:
        
    .. code-block:: json
        
        {
            "id": 1
        }
        
     **Response Codes**:
        
    .. code-block:: http
    
        200 : Success
        500 : Fail
    '''          
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
        '''
        Responds with all of the active and inactive ``Game`` objects. Including all the games ``Question`` and ``Option`` objects.

        **Example request**:
        
        .. code-block:: http
            
            GET  /api/games/

        **Example response**:
        
        .. code-block:: json
        
            [
                {
                    "title": "Example Game",
                    "creator_id": 1,
                    "code": 123456,
                    "active": true,
                    "questions": [
                        {
                            "id": 209,
                            "value": "Ignore Result",
                            "passcode": "123456",
                            "chance": false,
                            "game_id": 22,
                            "chance_game": "NO_GAME"
                        }
                    ],
                    "options": [
                        {
                            "id": 180,
                            "value": "Ignore Crash",
                            "weight": 1,
                            "dest_question_id": 210,
                            "source_question_id": 209
                        }
                    ]
                }
            ]
            
        **Response Codes**:
        
        .. code-block:: http
        
            200 : Success
            501 : Fail
        '''
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
        '''
        Creates a ```Game``` and all of the ```Question``` and ```Option``` objects that correspond with it. It uses "labels" to associate a ```Question``` with an ```Option```.
        
        Note -- A question does not need the ```chance_game``` field when request sent and this feild will default to ```NO_GAME```.
        
        **Example request**:
        
        .. code-block:: http
            
            POST  /api/games/
        
        ..code-block:: json
        
            {
                "title": "example game title",
                "active": (boolean),
                "creator_id": (id),
                "code": (integer),
                "questions": [
                    {
                        "label" : "",
                        "value" : "",
                        "passcode" : "",
                        "chance" : (boolean),
                        "chance_game": ""
                    }
                ],
                "options": [
                    {
                    "value": "",
                    "source_label": "",
                    "dest_label": "",
                    "weight": (integer)
                    }
                ]
            }
            
        **Response Codes**:
        
        .. code-block:: http
        
            200 : Success
            501 : Fail
        '''
        try:
            game_data = request.data
            questions = game_data['questions']
            options = game_data['options']
            question_label_reference = {}
            option_labels = []
            new_game = Game(
                title       = game_data['title'], 
                active      = game_data['active'], 
                creator_id  = game_data['creator_id'], 
                code        = game_data['code'])
            new_game.save()

            for question in questions:
                try:
                    chance_game = get_chance_game(question)
                except Exception as e:
                    return HttpResponse(status=400, content=e)
                new_question = Question(
                    value       = question['value'],
                    passcode    = question['passcode'],
                    chance      = question['chance'],
                    chance_game = chance_game,
                    game_id     = new_game.id
                )
                new_question.save()
                question_label_reference[question['label']] = new_question

            for option in options:
                new_option = Option(
                    value               = option['value'],
                    weight              = option['weight']
                )
                option_labels.append([new_option, option['source_label'], option['dest_label']])                
            
            option_i = 0
            source_q = 1
            dest_q = 2
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
        '''
        Updates an existing ```Game``` and all of the ```Question``` and ```Option``` objects that correspond with it. A query parameter is the ```Game``` ```id```.
        
         **Example request**:
        
        .. code-block:: http
            
            PUT  /api/games/{id}
            
        ..code-block:: json
        
            {
                "title": "Example Game",
                "creator_id": 1,
                "code": 123456,
                "active": true,
                "questions": [
                    {
                        "id": 209,
                        "value": "Ignore Result",
                        "passcode": "123456",
                        "chance": false,
                        "game_id": 22,
                        "chance_game": "NO_GAME"
                    }
                ],
                "options": [
                    {
                        "id": 180,
                        "value": "Ignore Crash",
                        "weight": 1,
                        "dest_question_id": 210,
                        "source_question_id": 209
                    }
                ]
            }
        
        **Response Codes**:
        
        .. code-block:: http
        
            200 : Success
            501 : Fail
        '''
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
        '''
        API Route saves information about an ```Option``` a ```Team``` chose while playing a game. This allows the players to progress through the game and have their responses recorded.
        
        **Example request**:
        
        .. code-block:: http
            
            POST  /api/gameSession/answer/
            
        .. code-block:: json
        
            {
                "option_id": (id),
                "team_id": (id)
            }
            
        **Response Codes**:
        
        .. code-block:: http
        
            200 : Success
            400 : Fail (message will indicate whether team/option does not exist or game play has timed out)
            500 : Fail
        '''
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
            if (isTimedOut(team.game_session_id, team)):
                return HttpResponse(status=400, content="Your Game has timed out. Please start a new Game.")
            answer.save()
            return Response()
        except Exception as e:
            return HttpResponse(status=500)
        
@api_view(['POST'])
def toggle_active(request):
    '''
    Toggles the ```active``` status of a ```Game``` object.
    
    **Example request**:
        
    .. code-block:: http
        
        POST  /api/games/toggleActive/
        
    .. code-block:: json
    
        {
            "id": (game id)
        }
    
    **Response Codes**:
        
    .. code-block:: http
        
            200 : Success
            500 : Fail
    '''
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
    '''
    Starts a ```GameSession``` so a game can be played by users.
    
    **Example request**:
        
    .. code-block:: http
            
        POST  /api/games/startSession/
        
    .. code-block:: json

        {
            "id": (game id),
            "creator_id": (id),
            "notes": "",
            "timeout": (integer minutes)
        }
        
    **Example response**:
    
    .. code-block:: json
        
        {
            "id": (game session id),
            "code": (integer)
        }
        
    **Response Codes**:
    
    .. code-block:: http
        
        200 : Success
        500 : Fail    
    '''
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

class ContextHelpViewSet(ModelViewSet):
    '''A view set for the context_help object. It expects {title: string, body: string, question_id: int[]}
    It supports create, read, update, and delete operations using POST, GET, PUT, and DELETE respectively
    create returns -- 201 on success and 400 on failure
    read returns -- 200 on success and 404 on failure
    update returns -- 200 on success and 404 on failure
    delete returns -- 204 on success and 404 on failure'''
    queryset = ContextHelp.objects.all()
    serializer_class = ContextHelpSerializer

@api_view(['GET'])
def get_contexts_by_question(request, question_id):
    """Function to retrieve all contexts relating to a given question (by int id)
    Returns -- 200 on success
    Returns -- 404 on failure"""
    try:
        # Used to force the except case if the given question_id is NAN
        question_id = int(question_id)
        contexts = ContextHelp.objects.filter(questions__in=[question_id])
        serializer = ContextHelpSerializer(contexts, many=True)
        return Response(data=serializer.data)
    except Exception:
        return HttpResponseBadRequest("Question IDs must be integers.")


@api_view(['GET'])
def get_games_sessions(request, game_id):
    '''
    Gets all game sessions using a game 
    '''
    try:
        game = Game.objects.get(id=int(game_id))
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    sessions = GameSession.objects.filter(game=game.id)
    
    serializer = GameSessionSerializer(sessions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_games_session(request, game_id, session_id):
    '''
    Gets all game sessions using a game 
    '''
    try:
        game = Game.objects.get(id=game_id)
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    try:
        session = GameSession.objects.get(id=session_id)
    except Exception:
        return HttpResponseBadRequest('Session does not exist')
    
    if session.game.id != game_id:
        return HttpResponseBadRequest('Session does not belong to that game')

    serializer = GameSessionSerializer(session)
    return Response(serializer.data)

@api_view(['GET'])
@renderer_classes([JSONRenderer, BrowsableAPIRenderer, CSVRenderer])
def get_games_session_report(request, game_id, session_id):
    '''Generate a report for the entire game session'''
    try:
        game = Game.objects.get(id=game_id)
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    try:
        session = GameSession.objects.get(id=session_id)
    except Exception:
        return HttpResponseBadRequest('Session does not exist')
    
    if session.game.id != game_id:
        return HttpResponseBadRequest('Session does not belong to that game')
    
    teams = Team.objects.filter(game_session_id=session.id).values_list('id', flat=True)
    answers = GameSessionAnswer.objects.filter(team__in=teams)
    serializer = AnswersReportSerializer(answers, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def get_game_session_teams(request, game_id, session_id):
    '''Get information about all teams for a game session'''
    try:
        game = Game.objects.get(id=game_id)
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    try:
        session = GameSession.objects.get(id=session_id)
    except Exception:
        return HttpResponseBadRequest('Session does not exist')
    
    if session.game.id != game_id:
        return HttpResponseBadRequest('Session does not belong to that game')

    teams = Team.objects.filter(game_session_id=session.id)

    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_game_session_team(request, game_id, session_id, team_id):
    '''Get information about a specific team'''
    try:
        game = Game.objects.get(id=game_id)
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    try:
        session = GameSession.objects.get(id=session_id)
    except Exception:
        return HttpResponseBadRequest('Session does not exist')
    
    if session.game.id != game_id:
        return HttpResponseBadRequest('Session does not belong to this game')

    try:
        team = Team.objects.get(id=team_id)
    except Exception:
        return HttpResponseServerError('Team does not exist')

    if session.id != team.game_session.id:
        return HttpResponseBadRequest('Team does not belong to this game session')

    serializer = TeamSerializer(team)
    return Response(serializer.data)

@api_view(['GET'])
@renderer_classes([JSONRenderer, BrowsableAPIRenderer, CSVRenderer])
def get_game_session_team_report(request, game_id, session_id, team_id):
    '''Generate a report for a specific team within a game session'''
    try:
        game = Game.objects.get(id=game_id)
    except Exception:
        return HttpResponseBadRequest('Game does not exist')

    try:
        session = GameSession.objects.get(id=session_id)
    except Exception:
        return HttpResponseBadRequest('Session does not exist')
    
    if session.game.id != game_id:
        return HttpResponseBadRequest('Session does not belong to this game')

    try:
        team = Team.objects.get(id=team_id)
    except Exception:
        return HttpResponseServerError('Team does not exist')

    if session.id != team.game_session.id:
        return HttpResponseBadRequest('Team does not belong to this game session')

    answers = GameSessionAnswer.objects.filter(team_id=team.id)
    serializer = AnswersReportSerializer(answers, many=True)
    return Response(serializer.data)
