from django.test import TestCase, RequestFactory
from backend.models import *
from .factories import UserFactory
from django.conf import settings

from ..utils import *

class UtilsTestCase(TestCase):
    def setUp(self):
        self.question = {
            "label":"7A",
            "value":"Inform Manager",
            "passcode":"123456",
            "chance":True
        }
        
    def test_get_chance_game_Coin_Flip(self):
        self.question['chance_game'] = 'Coin Flip'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.COIN_FLIP)
        
    def test_get_chance_game_COIN_FLIP(self):
        self.question['chance_game'] = 'COIN_FLIP'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.COIN_FLIP)
    
    def test_get_chance_game_Spin_Wheel(self):
        self.question['chance_game'] = 'Spin Wheel'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.SPIN_WHEEL)
    
    def test_get_chance_game_SPIN_WHEEL(self):
        self.question['chance_game'] = 'SPIN_WHEEL'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.SPIN_WHEEL)
        
    def test_get_chance_game_Draw_Marble(self):
        self.question['chance_game'] = 'Draw Marble'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_MARBLE)
    
    def test_get_chance_game_DRAW_MARBLE(self):
        self.question['chance_game'] = 'DRAW_MARBLE'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_MARBLE)
        
    def test_get_chance_game_Roll_Die(self):
        self.question['chance_game'] = 'Roll Die'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.ROLL_DIE)
    
    def test_get_chance_game_ROLL_DIE(self):
        self.question['chance_game'] = 'ROLL_DIE'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.ROLL_DIE)
        
    def test_get_chance_game_Draw_Card_Color(self):
        self.question['chance_game'] = 'Draw Card Color'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_CARD_COLOR)
    
    def test_get_chance_game_DRAW_CARD_COLOR(self):
        self.question['chance_game'] = 'DRAW_CARD_COLOR'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_CARD_COLOR)
    
    def test_get_chance_game_Draw_Card_Suit(self):
        self.question['chance_game'] = 'Draw Card Suit'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_CARD_SUIT)
    
    def test_get_chance_game_DRAW_CARD_SUIT(self):
        self.question['chance_game'] = 'DRAW_CARD_SUIT'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.DRAW_CARD_SUIT)
        
    def test_get_chance_game_No_Game(self):
        self.question['chance_game'] = 'No Game'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.NO_GAME)
    
    def test_get_chance_game_NO_GAME(self):
        self.question['chance_game'] = 'NO_GAME'
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.NO_GAME)
        
    def test_get_chance_game_no_chance_input(self):
        self.assertEqual(get_chance_game(self.question), Question.ChanceGame.NO_GAME)
    
    def test_get_chance_game_invalid_chance_game(self):
        invalid_name = 'Spin_Wheel'
        self.question['chance_game'] = invalid_name
        self.assertRaisesRegex(Exception, "The chance game '" + invalid_name + "' does not exist.")

    def test_get_time_for_answer(self):
        game = Game.objects.create(title='sirializerTest', creator_id=999, code=999999, active=True)
        session = GameSession.objects.create(creator_id=999, game=game, start_time=datetime.now(), end_time = None,
            notes = "", timeout = 5, code = 999999)
        mode = GameMode.objects.create(name="Walking")
        team = Team.objects.create(game_session = session, game_mode = mode, guest = True, size = 2, first_time = False, completed = False)
        question = Question.objects.create(value='Question', game_id=game.id, passcode="psw", chance=False, chance_game="")
        question2 = Question.objects.create(value='Question2', game_id=game.id, passcode="psw", chance=False, chance_game="")
        option = Option.objects.create(value='Option', weight=1, source_question_id=question.id, dest_question_id=question2.id)
        option2 = Option.objects.create(value='Option2', weight=1, source_question_id=question2.id, dest_question_id=question.id)
        answer = GameSessionAnswer.objects.create(team=team, question=question, option_chosen=option)
        answer2 = GameSessionAnswer.objects.create(team=team, question=question2, option_chosen=option2)
        self.assertEqual(get_time_for_answer(answer), 0)
        self.assertGreater(get_time_for_answer(answer2), 0)
        
    