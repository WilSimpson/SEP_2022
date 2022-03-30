from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role']
        )
        return user

    class Meta:
        model = get_user_model()
        fields = [ 'id', 'email', 'first_name', 'last_name', 'password', 'role' ]

class RoleTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['role'] = user.role
        token['id'] = user.id

        return token


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

class GameSessionSerializer(ModelSerializer):
    class Meta:
        model = GameSession
        fields = '__all__'

class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class GameModeSerializer(ModelSerializer):
    class Meta:
        model = GameMode
        fields = '__all__'    
class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class AnswersReportSerializer(ModelSerializer):
    class Meta:
        model = GameSessionAnswer
        fields = ('team', 'question', 'option_chosen')
    
    def to_representation(self, obj):
        '''
        Time to answer when:
            A: First answer: currently no reference, need a new way to find out
            B: NOT the first answer: difference between previous answer and this
        '''
        base = super().to_representation(obj)
        all_answers = GameSessionAnswer.objects \
            .exclude(id=obj.id) \
            .filter(team=obj.team) \
            .filter(created_at__lte=obj.created_at) \
            .order_by('-created_at')

        if len(all_answers) == 0: # Option A
            time = 0
        else:                     # Option B
            time = obj.created_at - all_answers[0].created_at

        base['time'] = time
        return base

        