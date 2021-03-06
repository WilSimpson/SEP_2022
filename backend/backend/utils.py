from .models import Game, Question, Option, GameSession, GameSessionAnswer
from django.http import HttpResponse
from random import randint
from datetime import datetime


def get_game_data(id):
    response_data = {}
    game = Game.objects.get(id=id)
    response_data['id'] = id
    response_data['title'] = game.title
    response_data['creator_id'] = game.creator_id
    response_data['code'] = game.code
    response_data['active'] = game.active
    response_data['created_at'] = game.created_at
    response_data['updated_at'] = game.created_at
    questions = []
    options = []
    all_game_questions = Question.objects.filter(game_id=id).all()
    for question in all_game_questions:
        q = {}
        q['id'] = question.id
        q['value'] = question.value
        q['passcode'] = question.passcode
        q['chance'] = question.chance
        q['chance_game'] = question.chance_game
        q['game_id'] = question.game_id
        q['created_at'] = question.created_at
        q['updated_at'] = question.created_at
        q['location'] = question.location
        
        questions.append(q)
        all_question_options = Option.objects.filter(source_question_id=question.id).all()
        for option in all_question_options:
            o = {}
            o['id'] = option.id
            o['value'] = option.value
            o['weight'] = option.weight
            o['dest_question_id'] = option.dest_question_id
            o['source_question_id'] = option.source_question_id
            o['created_at'] = game.created_at
            o['updated_at'] = game.created_at
            options.append(o)
    response_data['questions'] = questions
    response_data['options'] = options
    return response_data


def unique_random(low, high, exclude):
    '''Low -- lower bound
    High -- upper bound
    Exclude -- A list of numbers which should not be returned'''
    rand_int = randint(low,high)
    return unique_random(low, high, exclude) if rand_int in exclude else rand_int

 
def get_chance_game(question):
    if 'chance_game' in question:
        chance_game = question['chance_game']
        games = Question.ChanceGame.choices
        for t in games:
            if chance_game in t:
                return t[0]
        raise Exception("The chance game '" + chance_game + "' does not exist.")
    else:
        return Question.ChanceGame.NO_GAME
        
def get_time_for_answer(answer):
    all_answers = GameSessionAnswer.objects \
            .exclude(id=answer.id) \
            .filter(team=answer.team) \
            .filter(created_at__lte=answer.created_at) \
            .order_by('-created_at')
    
    if len(all_answers) == 0:
        previous_time = answer.team.created_at
    else:
        previous_time = all_answers[0].created_at
    
    return answer.created_at - previous_time

def isTimedOut(game_session_id, team, answer):
    tz_info = team.created_at.tzinfo
    current_time = datetime.now(tz_info)
    all_team_answers = GameSessionAnswer.objects \
                    .filter(team=team) \
                    .order_by('-created_at')
    if (answer.passcode_entered):
        minute_difference = (current_time - answer.created_at).total_seconds()/60
    elif (len(all_team_answers) > 0):
        minute_difference = (current_time - all_team_answers[0].created_at).total_seconds()/60
    else:
        minute_difference = (current_time - team.created_at).total_seconds()/60
    return minute_difference > GameSession.objects.get(id=game_session_id).timeout

