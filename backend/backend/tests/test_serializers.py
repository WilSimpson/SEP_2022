from django.test import TestCase

from ..serializers import *
from .factories import UserFactory

from ..models import Game, Option, Question, Course

from datetime import datetime

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
            if(type(getattr(self.game, k)) == datetime):
                self.assertEqual(v[:-4], getattr(self.game, k).replace(tzinfo=None).isoformat(sep='T', timespec='milliseconds')) 
            else:
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


class GameSessionSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        self.session = GameSession.objects.create(creator_id=999, game=self.game, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)

    def test_fields(self):
        serializer = GameSessionSerializer(self.session)
        for k in ['creator_id', 'end_time', 'notes', 'timeout', 'code']:
            self.assertEqual(serializer.data[k], getattr(self.session, k))


class TeamSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        self.session = GameSession.objects.create(creator_id=999, game=self.game, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)
        self.mode = GameMode.objects.create(name="Walking")
        self.team = Team.objects.create(game_session = self.session, game_mode = self.mode, guest = True, size = 2, first_time = False, completed = False)

    def test_fields(self):
        serializer = TeamSerializer(self.team)
        for k in ['guest', 'size', 'first_time', 'completed']:
            self.assertEqual(serializer.data[k], getattr(self.team, k))

class GameModeSerializerTest(TestCase):
    def setUp(self):
        self.mode = GameMode.objects.create(name="Walking")

    def test_fields(self):
        serializer = GameModeSerializer(self.mode)
        for k, v in serializer.data.items():
            if (type(getattr(self.mode, k)) == datetime):
                self.assertEqual(v[:-4], getattr(self.mode, k).replace(tzinfo=None).isoformat(sep='T', timespec='milliseconds')) 
            else:
                self.assertEqual(v, getattr(self.mode, k))

class CourseSerializerTest(TestCase):
    def setUp(self):
        self.course = Course.objects.create(name='courseTest', section='A', department="CS", number=1042, userId=1)

    def test_fields(self):
        serializer = CourseSerializer(self.course)
        for k in ['name', 'section', 'department', 'number', 'userId']:
            self.assertEqual(serializer.data[k], getattr(self.course, k))

class ContextHelpSerializerTest(TestCase):
    def setUp(self):
        self.context = ContextHelp.objects.create(title="Test 1", body="This is the hint body")

    def test_fields(self):
        serializer = ContextHelpSerializer(self.context)
        for k in ['title', 'body']:
            self.assertEqual(serializer.data[k], getattr(self.context, k))

class AnswersReportSerializerTest(TestCase):
    def setUp(self):
        self.game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        self.session = GameSession.objects.create(creator_id=999, game=self.game, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)
        self.mode = GameMode.objects.create(name="Walking")
        self.team = Team.objects.create(game_session = self.session, game_mode = self.mode, guest = True, size = 2, first_time = False, completed = False)
        self.question = Question.objects.create(value='Question', game_id=self.game.id, passcode="psw", chance=False, chance_game="")
        self.option = Option.objects.create(value='Option', weight=1, source_question_id=self.question.id, dest_question_id=self.question.id)
        self.answer = GameSessionAnswer.objects.create(team=self.team, question=self.question, option_chosen=self.option)

    def test_fields(self):
        serializer = AnswersReportSerializer(self.answer)
        self.assertIsNotNone(serializer.data['time'])
        for k in ['team', 'question', 'option_chosen']:
            self.assertEqual(serializer.data[k], getattr(self.answer, k).id)