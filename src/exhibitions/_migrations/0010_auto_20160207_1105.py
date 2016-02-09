# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-07 11:05
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('exhibitions', '0009_auto_20160206_0934'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 2, 7, 11, 4, 19, 481087, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='app',
            name='updated',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 2, 7, 11, 4, 32, 42044, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appinstance',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 2, 7, 11, 4, 39, 132387, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appinstance',
            name='updated',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 2, 7, 11, 4, 45, 339559, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='snapshot',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 2, 7, 11, 5, 12, 406741, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='snapshot',
            name='updated',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 2, 7, 11, 5, 16, 74463, tzinfo=utc)),
            preserve_default=False,
        ),
    ]