from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password, role='FACULTY'):
        if not email:
            raise ValueError('User must have an email address')

        if not password:
            raise ValueError('Password cannot be empty')

        if len(password) < 6:
            raise ValueError('Minimum password length is 6')

        if len(password) > 50:
            raise ValueError('Maximum password length is 50')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            role=role
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_faculty(self, email, first_name, last_name, password):
        return self.create_user(email, first_name, last_name, password, 'FACULTY')

    def create_admin(self, email, first_name, last_name, password):
        return self.create_user(email, first_name, last_name, password, 'ADMIN')

    def create_superuser(self, email, first_name, last_name, password, role):
        return self.create_user(email, first_name, last_name, password, 'ADMIN')


# Create your models here.
class User(AbstractBaseUser):
    class UserRole(models.TextChoices):
        FACULTY = 'FACULTY'
        ADMIN   = 'ADMIN'

    first_name = models.CharField(max_length=50)
    last_name  = models.CharField(max_length=50)
    role       = models.CharField(
        max_length=25,
        choices=UserRole.choices
    )
    email      = models.CharField(max_length=100, unique=True)
    password   = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # TODO: Change this to work with permissions
        return True

    def has_module_perms(self, app_label):
        # TODO: Change this to work with permissions
        return True

    @property
    def is_staff(self):
        return True

    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN

    objects = UserManager()