# Generated by Django 4.0.4 on 2022-04-25 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_todo_created_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='status',
            field=models.CharField(blank=True, choices=[('created', 'Yaratildi'), ('done', 'Bajarildi')], default='created', max_length=25, null=True),
        ),
    ]
