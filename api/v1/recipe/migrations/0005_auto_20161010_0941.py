# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-10 09:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0004_auto_20161010_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='cuisine',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='recipe_groups.Cuisine', verbose_name='cuisine'),
        ),
    ]
