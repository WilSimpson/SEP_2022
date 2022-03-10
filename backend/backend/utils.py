from .models import Game, Question, Option

def get_game_data(id):
    response_data = {}
    game = Game.objects.get(id=id)
    response_data['title'] = game.title
    response_data['creator_id'] = game.creator_id
    response_data['code'] = game.code
    response_data['active'] = game.active
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
        
        questions.append(q)
        all_question_options = Option.objects.filter(source_question_id=question.id).all()
        for option in all_question_options:
            o = {}
            o['id'] = option.id
            o['value'] = option.value
            o['weight'] = option.weight
            o['dest_question_id'] = option.dest_question_id
            o['source_question_id'] = option.source_question_id
            options.append(o)
    response_data['questions'] = questions
    response_data['options'] = options
    return response_data