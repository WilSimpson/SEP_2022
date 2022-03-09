from django.test import TestCase, RequestFactory
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

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
        self.assertEqual(resp.status_code, 502)

    
    def test_sessionless_game(self):
        data = {
            'code': 999997
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 503)

    def test_invalid_game(self):
        data = {
            'code': 999996
        }

        resp = self.client.post('/api/games/joinGame/', data=data)
        self.assertEqual(resp.status_code, 501)


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
        self.assertEqual(resp.status_code, 501)
