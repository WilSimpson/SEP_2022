from django.test import TestCase

from ..serializers import *
from .factories import UserFactory

from ..models import Game, Option, Question

class UserSerializerTest(TestCase):
    def test_model_fields(self):
        user = UserFactory()
        serializer = UserSerializer(user)
        for field_name in ['id', 'email', 'first_name', 'last_name']:
            self.assertEqual(serializer.data[field_name], getattr(user, field_name))

class GameSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)

    def test_fields(self):
        serializer = GameSerializer(self.game)
        for k, v in serializer.data.items():
            self.assertEqual(v, getattr(self.game, k))

class QuestionSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        self.question = Question.objects.create(value='Question', game_id=self.game.id, passcode="psw", chance=False, chance_game="")

    def test_fields(self):
        serializer = QuestionSerializer(self.question)
        for k in ['value', 'passcode', 'chance']:
            self.assertEqual(serializer.data[k], getattr(self.question, k))

class OptionSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        self.question = Question.objects.create(value='Question', game_id=self.game.id, passcode="psw", chance=False, chance_game="")
        self.option = Option.objects.create(value='Option', weight=1, source_question_id=self.question.id, dest_question_id=self.question.id)

    def test_fields(self):
        serializer = OptionSerializer(self.option)
        for k in ['value', 'weight']:
            self.assertEqual(serializer.data[k], getattr(self.option, k))