from django.test import TestCase, RequestFactory
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

from backend.models import Game, Option, Question

from .factories import UserFactory

from ..models import *

from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
import jwt
import os
from datetime import datetime

# TODO: Refactor tests to be DRY
class UserViewSetTestCase(TestCase):
    def test_create_faculty(self):
        # POST to create a User
        data = {
            'email': 'test@example.com',
            'first_name': 'first',
            'last_name': 'last',
            'password': 'password',
            'role': 'FACULTY'
        }
        initialCount = get_user_model().objects.count()
        resp = self.client.post(reverse('user-list'), data=data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), initialCount+1)
        user = get_user_model().objects.first()

        for field_name in data.keys():
            if field_name != 'password':
                self.assertEqual(getattr(user, field_name), data[field_name])
            else:
                self.assertIsNotNone(authenticate(username=data['email'], password=data['password']))

    def test_create_admin(self):
        # POST to create a User
        data = {
            'email': 'test@example.com',
            'first_name': 'first',
            'last_name': 'last',
            'password': 'password',
            'role': 'ADMIN'
        }
        initialCount = get_user_model().objects.count()
        resp = self.client.post(reverse('user-list'), data=data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), initialCount+1)
        user = get_user_model().objects.first()

        for field_name in data.keys():
            if field_name != 'password':
                self.assertEqual(getattr(user, field_name), data[field_name])
            else:
                self.assertIsNotNone(authenticate(username=data['email'], password=data['password']))

    def test_post_invalid_role(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'first',
            'last_name': 'last',
            'password': 'password',
            'role': 'DNE'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_post_missing_email(self):
        data = {
            'first_name': 'first',
            'last_name': 'last',
            'password': 'password',
            'role': 'FACULTY'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_missing_first_name(self):
        data = {
            'email': 'test@example.com',
            'last_name': 'last',
            'password': 'password',
            'role': 'FACULTY'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_missing_last_name(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'first',
            'password': 'password',
            'role': 'FACULTY'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_missing_password(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'first',
            'last_name': 'password',
            'role': 'FACULTY'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


    def test_post_missing_role(self):
        data = {
            'email': 'test@example.com',
            'password': 'password',
            'first_name': 'first',
            'last_name': 'password'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
class LoginViewTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects
        self.testUser = self.user.create_user('test@test.com', 'test', 'test', 'testadmin')
        self.factory = RequestFactory()
    def test_wrong_password(self):
        data = {
            'email': 'test@test.com',
            'password': 'wrong'
        }
        resp = self.client.post('/api/token/', data=data)
        self.assertEqual(resp.status_code, 401)
    def test_wrong_email(self):
        data = {
            'email': 'wrong',
            'password': 'testadmin'
        }
        resp = self.client.post('/api/token/', data=data)
        self.assertEqual(resp.status_code, 401)
    def test_wrong_both(self):
        data = {
            'email': 'wrong',
            'password': 'wrong'
        }
        resp = self.client.post('/api/token/', data=data)
        self.assertEqual(resp.status_code, 401)
    def test_correct_login(self):
        data = {
            'email': 'test@test.com',
            'password': 'testadmin'
        }
        resp = self.client.post('/api/token/', data=data)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('access' in resp.data)
        self.assertTrue('refresh' in resp.data)
    def test_correct_claims(self):
        data = {
            'email': 'test@test.com',
            'password': 'testadmin'
        }
        auth = JWTAuthentication()
        resp = self.client.post('/api/token/', data=data)
        token = resp.data['access']
        decoded = jwt.decode(token, os.environ['EA_BACKEND_SECRET'], algorithms=["HS256"])
        self.assertEqual(decoded['email'], 'test@test.com')
        self.assertEqual(decoded['role'], 'FACULTY')

class RefreshViewTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects
        self.testUser = self.user.create_user('test@test.com', 'test', 'test', 'testadmin')
        data = {
            'email': 'test@test.com',
            'password': 'testadmin'
        }
        self.resp = self.client.post('/api/token/', data=data)
        self.refresh = self.resp.data['refresh']
        self.access = self.resp.data['access']
    def test_token_refresh(self):
        data = {
            'refresh': self.refresh
        }
        resp = self.client.post('/api/token/refresh/', data=data)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('access' in resp.data)
        self.assertTrue('refresh' in resp.data)
    def test_token_refresh_bad_token(self):
        data = {
            'refresh': 'eguehfuhiueh'
            }
        resp = self.client.post('/api/token/refresh/', data=data)
        self.assertEqual(resp.status_code, 401)
class VerifyViewTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects
        self.testUser = self.user.create_user('test@test.com', 'test', 'test', 'testadmin')
        data = {
            'email': 'test@test.com',
            'password': 'testadmin'
        }
        self.resp = self.client.post('/api/token/', data=data)
        self.refresh = self.resp.data['refresh']
        self.access = self.resp.data['access']
    def test_token_verify(self):
        data = {
            'token': self.access
        }
        resp = self.client.post('/api/token/verify', data=data)
        self.assertEqual(resp.status_code, 200)
    def test_token_verify_bad_token(self):
        data = {
            'token': 'efeuhueufh'
        }
        resp = self.client.post('/api/token/verify', data=data)
        self.assertEqual(resp.status_code, 401)

class JoinGameTestCase(TestCase):
    def setUp(self):
        new_active = Game.objects.create(title='testActive', creator_id=999, code=999999, active=True)
        new_inactive = Game.objects.create(title='testInactive', creator_id=999, code=999998, active=False)
        active_session = GameSession.objects.create(creator_id=999, game=new_active, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)
        inactive_session = GameSession.objects.create(creator_id=999, game=new_inactive, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999998)
        sessionless_game = Game.objects.create(title='noSession', creator_id=999, code=999997, active=True)


    def test_valid_game(self):
        data = {
            'code': 999999
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 200)

    def test_inactive_game(self):
        data = {
            'code': 999998
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 500)

    
    def test_sessionless_game(self):
        data = {
            'code': 999997
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 500)

    def test_invalid_game(self):
        data = {
            'code': 999996
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 500)


class CreateTeamTestCase(TestCase):
    def setUp(self):
        new_active = Game.objects.create(title='testActive', creator_id=999, code=999999, active=True)
        self.active_session = GameSession.objects.create(creator_id=999, game=new_active, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)
        new_mode = GameMode.objects.create(name="Walking")


    def test_valid_request(self):
        data = {
            'session': self.active_session.id,
            'mode': "Walking",
            'guest': "yes",
            'size': 1,
            'first_time': "yes"
        }

        resp = self.client.post('/api/teams/createTeam/', data=data)
        self.assertEqual(resp.status_code, 200)

    def test_invalid_request(self):
        data = {
            'session': self.active_session.id,
            'mode': "walk",
            'guest': "yes",
            'size': 1,
            'first_time': "yes"
        }

        resp = self.client.post('/api/teams/createTeam/', data=data)
        self.assertEqual(resp.status_code, 500)
class GameViewSetTestCase(TestCase):
    def setUp(self):
        # create game
        self.game = Game.objects.create(title='TestGame', creator_id=1, code=123456, active=True)
        self.q1 = Question.objects.create(value='Q1', passcode=123456, chance=False, game_id=self.game.id)
        self.q2 = Question.objects.create(value='Q2', passcode=123456, chance=False, game_id=self.game.id)
        self.o1 = Option.objects.create(value='O1', weight=1, dest_question_id=self.q2.id, source_question_id=self.q1.id)
        self.o2 = Option.objects.create(value='O2', weight=1, dest_question_id=self.q2.id, source_question_id=self.q1.id)
        self.initial_game_count = Game.objects.all().count()
        self.initial_question_count = Question.objects.all().count()
        self.initial_option_count = Option.objects.all().count()
        self.data = {"title": "TestGame", "creator_id": 1,"code": 123456, "active": True,
                    "questions": [{"id": self.q1.id,"value": "Q1","passcode": "123456","chance": False,"game_id": self.game.id},
                                {"id": self.q2.id,"value": "Q2","passcode": "123456","chance": False,"game_id": self.game.id}
                    ],
                    "options": [{"id": self.o1.id,"value": "O1","weight": 1,"dest_question_id": self.q2.id,"source_question_id": self.q1.id},
                                {"id": self.o2.id,"value": "O2","weight": 1,"dest_question_id": self.q2.id,"source_question_id": self.q1.id}
                    ]}
        self.create_data = {"title": "TestGame","active": True,"creator_id": 1,"code": 123456,
                            "questions": [{"label": "Q1","value": "Q1","passcode": 123456,"chance": False},
                                          {"label": "Q2","value": "Q2","passcode": 123456,"chance": False}
                            ],
                            "options": [{"value": "O1","source_label": "Q1","dest_label": "Q2","weight": 1},
                                        {"value": "O2","source_label": "Q1","dest_label": "Q2","weight": 1}
                            ]}
        
    def test_get_valid_game(self):
        resp = self.client.get('/api/games/'+str(self.game.id)+'/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data, self.data)
        
    def test_get_invalid_game(self):
        resp = self.client.get('/api/games/'+str(self.game.id + 1)+'/')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
        
    def test_delete_valid_game(self):
        initial_game_count = Game.objects.all().count()
        initial_question_count = Question.objects.all().count()
        initial_option_count = Option.objects.all().count()
        resp = self.client.delete('/api/games/'+str(self.game.id)+'/')
        self.assertEqual(Game.objects.all().count(), initial_game_count-1)
        self.assertEqual(Question.objects.all().count(), initial_question_count-2)
        self.assertEqual(Option.objects.all().count(), initial_option_count-2)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        
    def test_delete_invalid_game(self):
        resp = self.client.delete('/api/games/'+str(self.game.id+1)+'/')
        self.assertEqual(Game.objects.all().count(), self.initial_game_count)
        self.assertEqual(Question.objects.all().count(), self.initial_question_count)
        self.assertEqual(Option.objects.all().count(), self.initial_option_count)
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
    
    def test_get_all_games(self):
        resp = self.client.get('/api/games/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data, [self.data])
    
    def test_get_all_games_empty(self):
        Game.objects.filter(id=self.game.id).delete()
        resp = self.client.get('/api/games/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data, [])
    
    def test_create_game(self):
        resp = self.client.post('/api/games/', self.create_data, content_type='application/json')
        self.assertEqual(Game.objects.all().count(), self.initial_game_count+1)
        self.assertEqual(Question.objects.all().count(), self.initial_question_count+2)
        self.assertEqual(Option.objects.all().count(), self.initial_option_count+2)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        games = Game.objects.all()
        for game in games:
            if game.id != self.game.id:
                new_game = game
                break
        self.assertEqual(new_game.title, self.create_data['title'])
        self.assertEqual(new_game.active, self.create_data['active'])
        self.assertEqual(new_game.code, self.create_data['code'])
        self.assertEqual(new_game.creator_id, self.create_data['creator_id'])
        new_questions = Question.objects.filter(game_id=new_game.id).all()
        i = 0
        for question in new_questions:
            self.assertEqual(question.value, self.create_data['questions'][i]['value'])
            self.assertEqual(question.passcode, str(self.create_data['questions'][i]['passcode']))
            self.assertEqual(question.chance, self.create_data['questions'][i]['chance'])
            self.assertEqual(question.game_id, game.id)
            i+=1
            j=0
            new_options = Option.objects.filter(source_question_id=question.id)
            for option in new_options:
                self.assertEqual(option.value, self.create_data['options'][j]['value'])
                self.assertEqual(option.weight, self.create_data['options'][j]['weight'])
                self.assertEqual(option.source_question_id, question.id)
                self.assertIsNotNone(option.dest_question)
                j+=1
    
    def test_create_game_no_code(self):
        new_game = self.create_data
        new_game["code"] = None
        resp = self.client.post('/api/games/', new_game, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
        
    def test_create_game_no_title(self):
        new_game = self.create_data
        new_game["title"] = None
        resp = self.client.post('/api/games/', new_game, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
        
    def test_create_game_no_questions(self):
        new_game = self.create_data
        new_game["questions"] = None
        resp = self.client.post('/api/games/', new_game, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
    
    def test_create_game_no_options(self):
        new_game = self.create_data
        new_game["questions"] = None
        resp = self.client.post('/api/games/', new_game, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)
    
    def test_update_game_game_values(self):
        updated_game_data = self.data
        updated_game_data["title"] = "TestGame 2"
        updated_game_data["creator_id"] = 2
        updated_game_data["code"] = 654321
        updated_game_data["active"] = not self.game.active
        resp = self.client.put('/api/games/'+str(self.game.id)+'/', updated_game_data, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        updated_game = Game.objects.get(id=self.game.id)
        self.assertEqual(updated_game_data["title"], updated_game.title)
        self.assertEqual(updated_game_data["creator_id"], updated_game.creator_id)
        self.assertEqual(updated_game_data["code"], updated_game.code)
        self.assertEqual(updated_game_data["active"], updated_game.active)
        
    def test_update_game_question_values(self):
        updated_question_data = self.data
        updated_question_data["questions"][0]["value"] = "Q1-1"
        updated_question_data["questions"][0]["passcode"] = "654321"
        updated_question_data["questions"][0]["chance"] = True
        updated_question_data["questions"][1]["value"] = "Q2-1"
        updated_question_data["questions"][1]["passcode"] = "654321"
        updated_question_data["questions"][1]["chance"] = True
        resp = self.client.put('/api/games/'+str(self.game.id)+'/', updated_question_data, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        updated_game = Game.objects.get(id=self.game.id)
        updated_questions = Question.objects.filter(game_id=self.game.id).all()
        i=0
        for question in updated_questions:
            self.assertEqual(updated_question_data["questions"][i]["value"], question.value)
            self.assertEqual(updated_question_data["questions"][i]["passcode"], question.passcode)
            self.assertEqual(updated_question_data["questions"][i]["chance"], question.chance)
            i+=1
            
    def test_update_game_option_values(self):
        updated_option_data = self.data
        updated_option_data["options"][0]["value"] = "O1-1"
        updated_option_data["options"][0]["weight"] = 2
        updated_option_data["options"][1]["value"] = "O2-1"
        updated_option_data["options"][1]["weight"] = 2
        resp = self.client.put('/api/games/'+str(self.game.id)+'/', updated_option_data, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        updated_game = Game.objects.get(id=self.game.id)
        updated_questions = Question.objects.filter(game_id=self.game.id).all()
        for question in updated_questions:
            i=0
            updated_options = Option.objects.filter(source_question_id=question.id)
            for option in updated_options:
                self.assertEqual(updated_option_data["options"][i]["value"], option.value)
                self.assertEqual(updated_option_data["options"][i]["weight"], option.weight)
                i+=1
    
    def test_update_invalid_game(self):
        resp = self.client.put('/api/games/'+str(0)+'/', self.data, content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_501_NOT_IMPLEMENTED)


class SessionViewTestCase(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='test', creator_id=999, code=999999, active=True)

    def test_valid_session_start(self):
        data = {
            'creator_id': 1,
            'id': self.game.id,
            'notes': "This is a test note",
            'timeout': 5
        }

        resp = self.client.post('/api/games/startSession/', data=data)
        self.assertEqual(resp.status_code, 200)

    def test_invalid_session_start(self):
        data = {
            'id': self.game.id,
        }
        print("START-------")
        print(data)

        resp = self.client.post('/api/games/startSession/', data=data)
        self.assertEqual(resp.status_code, 500)

    def test_session_start_no_game(self):
        data = {
            'creator_id': 1,
            'id': 9999999,
            'notes': "This is a test note",
            'timeout': 5
        }

        resp = self.client.post('/api/games/startSession/', data=data)
        self.assertEqual(resp.status_code, 500)

    def test_toggle_valid(self):
        state = self.game.active
        data = {
            'id': self.game.id
        }
        resp = self.client.post('/api/games/toggleActive/', data=data)
        self.assertEqual(resp.status_code, 200)

    def test_toggle_invalid(self):
        data = {
            'id': 9999999
        }
        resp = self.client.post('/api/games/toggleActive/', data=data)
        self.assertEqual(resp.status_code, 500)
