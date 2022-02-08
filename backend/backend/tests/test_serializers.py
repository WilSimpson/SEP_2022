from django.test import TestCase

from ..serializers import UserSerializer
from .factories import UserFactory

class UserSerializerTest(TestCase):
    def test_model_fields(self):
        user = UserFactory()
        serializer = UserSerializer(user)
        for field_name in ['id', 'email', 'first_name', 'last_name']:
            self.assertEqual(serializer.data[field_name], getattr(user, field_name))