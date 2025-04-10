# Generated by Django 5.1.7 on 2025-04-10 10:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_athleteprofile_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analystprofile',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='analystprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='analyst', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='analystprofile',
            name='years_of_experience',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='height',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='jersey_no',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='nationality',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='position',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='weight',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coachprofile',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coachprofile',
            name='coaching_style',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='coachprofile',
            name='years_of_experience',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
