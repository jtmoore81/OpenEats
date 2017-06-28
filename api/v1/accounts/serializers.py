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
        print 'create'
        print validated_data
        return {}


    def update(self, instance, validated_data):
        print 'update'
        print instance
        print validated_data

        # Check old password
        # if not instance.check_password(self.old_password):
            # return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        # set_password also hashes the password that the user will get
        # instance.set_password(self.new_password)
        # instance.save()
        # return Response("Success.", status=status.HTTP_200_OK)

        return {}
