# Generated by Django 4.0.2 on 2022-03-07 20:03

import backend.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_rename_game_id_question_game'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='game',
            name='updated_at',
            field=backend.models.AutoDateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='option',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='option',
            name='updated_at',
            field=backend.models.AutoDateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='question',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='question',
            name='updated_at',
            field=backend.models.AutoDateTimeField(default=django.utils.timezone.now),
        ),
    ]
