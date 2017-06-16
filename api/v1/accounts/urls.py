#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from v1.accounts.views import custom_obtain_auth_token
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter(schema_title='Users')
router.register(r'users', views.UserViewSet, base_name='Users')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^obtain-auth-token/$', custom_obtain_auth_token),
]
