from django.test import TestCase, RequestFactory
from backend.models import Game, Option, Question
from .factories import UserFactory
from django.conf import settings

from ..utils import get_chance_game

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
    