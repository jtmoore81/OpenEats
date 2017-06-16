#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions


class IsAdminOrUser(permissions.BasePermission):
    """
    Custom permission to only allow owners
    of an list and admins to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Only show all data to super admins.
        if request.user.is_superuser:
            return True

        # No one but the admin or the user can view/update the account
        return obj.user == request.user

    def has_permission(self, request, view):
        # No one but the admin or the user can view/update the accounts
        return request.user and request.user.is_superuser
