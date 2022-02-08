from factory import Factory, Faker

from django.contrib.auth import get_user_model

class UserFactory(Factory):
    email = Faker("email")
    first_name = Faker("first_name")
    last_name = Faker("last_name")
    role = 'STAFF'

    class Meta:
        model = get_user_model()