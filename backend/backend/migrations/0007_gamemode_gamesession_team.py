# Generated by Django 4.0.2 on 2022-03-09 18:06

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_question_chance_game'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameMode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator_id', models.IntegerField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('notes', models.TextField()),
                ('timeout', models.IntegerField()),
                ('code', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999999)])),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.game')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guest', models.BooleanField(default=True)),
                ('size', models.IntegerField()),
                ('first_time', models.BooleanField()),
                ('completed', models.BooleanField()),
                ('game_mode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.gamemode')),
                ('game_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.gamesession')),
            ],
        ),
    ]
