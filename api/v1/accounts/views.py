#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, PasswordSerializer
from .permissions import IsAdminOrUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminOrUser,)

    def retrieve(self, request, pk=None):
        """ Tests if a users is authentication if they supply pk == 'i' """
        if pk == 'i':
            return Response(
                UserSerializer(
                    request.user, context={'request':request}
                ).data
            )
        return super(UserViewSet, self).retrieve(request, pk)

    def create(self, request, *args, **kwargs):
        response = super(UserViewSet, self).create(request, *args, **kwargs)
        # After we create the user, update the password.
        self.update_password(User.objects.get(pk=response.data.get('id')))
        return response

    def update(self, request, *args, **kwargs):
        response = super(UserViewSet, self).update(request, *args, **kwargs)
        # Update the password.
        self.update_password(self.get_object())
        return response

    def update_password(self, instance):
        # TODO: mine the data for passwords
        # make sure to add logic to check if the password needs to be updated
        data = {
            'old_password': self.request.data.get('oldPassword', ''),
            'new_password': self.request.data.get('newPassword', ''),
            'confirm_password': self.request.data.get('confirmPassword', ''),
        }

        serializer = PasswordSerializer(instance, data=data)
        if serializer.is_valid():
            serializer.save()


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'id': user.id, 'token': token.key})

custom_obtain_auth_token = CustomObtainAuthToken.as_view()
