#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """ Standard `rest_framework` ModelSerializer """
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'username',
            'is_superuser',
        )


class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()

    def create(self, validated_data):
        """ This end point shouldn't be creating users, just updating them"""
        return {}

    def update(self, instance, validated_data):
        # Check old password, do nothing if its the same.
        if instance.check_password(validated_data.get('old_password')) or not instance.has_usable_password():
            # Make sure we typed in the password correctly
            if validated_data.get('new_password') == validated_data.get('confirm_password'):
                # set_password also hashes the password that the user will get
                instance.set_password(validated_data.get('new_password'))
                instance.save()

        return instance
