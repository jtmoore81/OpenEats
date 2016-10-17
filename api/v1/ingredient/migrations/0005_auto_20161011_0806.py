# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-11 08:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0004_remove_ingredient_preparation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipe.Recipe', verbose_name='recipe'),
        ),
    ]
