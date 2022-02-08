from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth import get_user_model

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