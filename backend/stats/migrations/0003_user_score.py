# Generated by Django 3.0.4 on 2020-03-07 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0002_auto_20200307_1406'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
