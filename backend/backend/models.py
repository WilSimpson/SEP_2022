from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

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

    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)

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


class Game(models.Model):
    title       = models.CharField(max_length=255)
    creator_id  = models.IntegerField()
    code        = models.IntegerField(validators=[MinValueValidator(0),
                                                   MaxValueValidator(999999)], default=0)
    active      = models.BooleanField()
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)

class Question(models.Model):
    class ChanceGame(models.TextChoices):
        COIN_FLIP       = 'COIN_FLIP'
        SPIN_WHEEL      = 'SPIN_WHEEL'
        DRAW_MARBLE     = 'DRAW_MARBLE'
        ROLL_DIE        = 'ROLL_DIE'
        DRAW_CARD_COLOR = 'DRAW_CARD_COLOR'
        DRAW_CARD_SUIT  = 'DRAW_CARD_SUIT'
        NO_GAME         = 'NO_GAME'
        
    value       = models.TextField()
    game        = models.ForeignKey(Game, on_delete= models.CASCADE)
    passcode    = models.CharField(max_length=255)
    chance      = models.BooleanField()
    chance_game = models.CharField(max_length=50, choices=ChanceGame.choices)
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)
    
class Option(models.Model):
    value           = models.TextField()
    weight          = models.IntegerField()
    source_question = models.ForeignKey(Question, on_delete= models.CASCADE, related_name='source')
    dest_question   = models.ForeignKey(Question, on_delete= models.CASCADE, related_name='destination')
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)

class GameSession(models.Model):
    creator_id = models.IntegerField()
    game = models.ForeignKey(Game, on_delete= models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    notes = models.TextField()
    timeout = models.IntegerField()
    code = models.IntegerField(validators=[MinValueValidator(0),
                                MaxValueValidator(999999)], default=0)
    active = models.BooleanField(default=True)
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)

class GameMode(models.Model):
    name = models.CharField(max_length=20)
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)

class Team(models.Model):
    game_session = models.ForeignKey(GameSession, on_delete= models.CASCADE)
    game_mode = models.ForeignKey(GameMode, on_delete=models.CASCADE)
    guest = models.BooleanField(default=True)
    size = models.IntegerField()
    first_time = models.BooleanField()
    completed = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = AutoDateTimeField(default=timezone.now)

class GameSessionAnswer(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    option_chosen = models.ForeignKey(Option, on_delete=models.CASCADE, blank=True, null=True)
    passcode_entered = models.BooleanField(default=False)
    created_at  = models.DateTimeField(default=timezone.now)
    updated_at  = AutoDateTimeField(default=timezone.now)
class Course(models.Model):        
    name       = models.TextField()
    section        = models.CharField(max_length=32)
    department    = models.CharField(max_length=32)
    number      = models.IntegerField()
    semester    = models.CharField(max_length=32, default="No Semester Set")
    userId = models.IntegerField()

class ContextHelp(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    questions = models.ManyToManyField(Question, default=None)
