# Generated by Django 4.0.2 on 2022-03-10 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_game_created_at_game_updated_at_option_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='chance_game',
            field=models.CharField(choices=[('COIN_FLIP', 'Coin Flip'), ('SPIN_WHEEL', 'Spin Wheel'), ('DRAW_MARBLE', 'Draw Marble'), ('ROLL_DIE', 'Roll Die'), ('DRAW_CARD_COLOR', 'Draw Card Color'), ('DRAW_CARD_SUIT', 'Draw Card Suit'), ('NO_GAME', 'No Game')], max_length=50),
        ),
    ]
