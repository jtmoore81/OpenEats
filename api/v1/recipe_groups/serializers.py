#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from models import Cuisine


class CuisineSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Cuisine
        exclude = ('slug',)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Cuisine.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
