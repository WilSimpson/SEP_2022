from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

    class Meta:
        model = User
        fields = [ 'id', 'username', 'email', 'first_name', 'last_name', 'password' ]