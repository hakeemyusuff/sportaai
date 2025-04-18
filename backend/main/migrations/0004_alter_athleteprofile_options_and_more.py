# Generated by Django 5.1.7 on 2025-04-10 10:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alert_match_team_alertinteraction_analystprofile_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='athleteprofile',
            options={},
        ),
        migrations.AlterField(
            model_name='analystprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='athleteprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='athlete', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='coachprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
