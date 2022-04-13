from rest_framework.serializers import ModelSerializer, CharField
from rest_framework_csv.renderers import CSVRenderer
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from backend.utils import get_time_for_answer

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

class ContextHelpSerializer(ModelSerializer):
    class Meta:
        model = ContextHelp
        fields = '__all__'

class AnswersReportSerializer(ModelSerializer):
    class Meta:
        model = GameSessionAnswer
        fields = ('id', 'team', 'question', 'option_chosen')
    
    def to_representation(self, obj):
        '''
        Time to answer when:
            A: First answer: diferrence between team created at time and this
            B: NOT the first answer: difference between previous answer and this
        '''
        base = super().to_representation(obj)

        base['time'] = get_time_for_answer(obj)
        return base

class AnswersReportCSVSerializer(CSVRenderer):
    headers = ['id', 'team', 'question', 'option_chosen', 'time']

class DynamicSerializerMixin:
        """
        A Serializer that takes an additional `fields` argument that
        controls which fields should be used.
        """

        def __init__(self, *args, **kwargs):
            # Don't pass the 'fields' arg up to the superclass
            fields = kwargs.pop("fields", None)
            excluded_fields = kwargs.pop("excluded_fields", None)
            required_fields = kwargs.pop("required_fields", None)

            # Instantiate the superclass normally
            super().__init__(*args, **kwargs)

            if fields is not None:
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields)
                for field_name in existing - allowed:
                    self.fields.pop(field_name)

                if isinstance(fields, dict):
                    for field, config in fields.items():
                        set_attrs(self.fields[field], config)

            if excluded_fields is not None:
                # Drop any fields that are not specified in the `fields` argument.
                for field_name in excluded_fields:
                    self.fields.pop(field_name)

            if required_fields is not None:
                for field_name in required_fields:
                    self.fields[field_name].required = True