# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-31 22:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0016_auto_20160130_2158'),
    ]

    operations = [
        migrations.AddField(
            model_name='zeroplayergame',
            name='updated',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]