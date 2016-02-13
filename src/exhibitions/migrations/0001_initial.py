# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-12 13:20
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_thumbs.db.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=500)),
                ('description', models.TextField(blank=True)),
                ('scriptType', models.CharField(max_length=100, null=True)),
                ('source', models.TextField(blank=True)),
                ('seedStructure', models.TextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AppInstance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('seed', models.TextField()),
                ('pagecache', models.TextField(blank=True, null=True)),
                ('app', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instances', to='exhibitions.App')),
                ('instantiator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', django_thumbs.db.models.ImageWithThumbsField(blank=True, null=True, upload_to=b'')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='exhibitions.Category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='JSLibrary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('scriptPath', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'JS libraries',
            },
        ),
        migrations.CreateModel(
            name='Snapshot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('image', django_thumbs.db.models.ImageWithThumbsField(upload_to=b'')),
                ('time', models.FloatField(default=0)),
                ('instance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='exhibitions.AppInstance')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='app',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exhibitions.Category'),
        ),
        migrations.AddField(
            model_name='app',
            name='extraIncludes',
            field=models.ManyToManyField(blank=True, related_name='included_in', to='exhibitions.JSLibrary'),
        ),
        migrations.AddField(
            model_name='app',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='apps', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='app',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='exhibitions.App'),
        ),
    ]