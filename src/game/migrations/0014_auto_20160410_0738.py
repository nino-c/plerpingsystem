# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-10 07:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0013_auto_20160409_1749'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeedKeyVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=255)),
                ('val', models.TextField(default='')),
                ('jsonval', models.TextField(default='')),
            ],
        ),
        migrations.AddField(
            model_name='gameinstance',
            name='seedParams',
            field=models.ManyToManyField(blank=True, null=True, to='game.SeedKeyVal'),
        ),
    ]
