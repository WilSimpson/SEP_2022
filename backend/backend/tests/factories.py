from factory import Factory, Faker

from django.contrib.auth.models import User

class UserFactory(Factory):
    username = Faker("first_name")
    email = Faker("email")
    first_name = Faker("first_name")
    last_name = Faker("last_name")

    class Meta:
        model = User