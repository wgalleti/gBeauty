# Generated by Django 4.0.3 on 2022-03-12 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_service_time_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='treatment',
            name='duration',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
