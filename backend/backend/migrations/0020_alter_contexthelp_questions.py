# Generated by Django 4.0.2 on 2022-04-13 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_merge_20220413_0055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contexthelp',
            name='questions',
            field=models.ManyToManyField(default=None, to='backend.Question'),
        ),
    ]
