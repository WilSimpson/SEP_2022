# Generated by Django 4.0.2 on 2022-04-06 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alter_game_created_at_alter_gamemode_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamesession',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
