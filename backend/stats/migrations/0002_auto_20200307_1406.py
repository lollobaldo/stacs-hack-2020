# Generated by Django 3.0.4 on 2020-03-07 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='id',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.AddField(
            model_name='user',
            name='cardboard',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='glass',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='metal',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='paper',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='Tatotoio88@', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='plastic',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='trash',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='vitto', max_length=100, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Stats',
        ),
    ]
