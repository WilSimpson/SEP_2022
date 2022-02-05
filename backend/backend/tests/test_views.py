from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

from .factories import UserFactory

class UserViewSetTestCase(TestCase):
    def test_post(self):
        # POST to create a User
        data = {
            'username': 'username',
            'email': 'test@example.com',
            'first_name': 'first',
            'last_name': 'last',
        }
        initialCount = User.objects.count()
        resp = self.client.post(reverse('user-list'), data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), initialCount+1)
        user = User.objects.first()
        for field_name in data.keys():
            self.assertEqual(getattr(user, field_name), data[field_name])