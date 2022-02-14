from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

from .factories import UserFactory

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
class UserViewSetTestCase(TestCase):
    def test_wrong_password(self):
        data = {
            'email': 'test@example.com',
            'password': 'wrong'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_Unauthorized)
     def test_wrong_email(self):
        data = {
            'email': 'wrong',
            'password': 'test'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_Unauthorized)
    def test_wrong_both(self):
        data = {
            'email': 'wrong',
            'password': 'wrong'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_Unauthorized)
    def test_correct_login(self):
        data = {
            'email': 'test@example.com',
            'password': 'test'
        }
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_200_Ok)