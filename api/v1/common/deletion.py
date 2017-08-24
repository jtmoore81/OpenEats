#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from functools import partial
import six
import graphene
from graphene.utils.is_base_type import is_base_type
from graphene.utils.get_unbound_function import get_unbound_function
from graphene.utils.props import props
from graphene.types.field import Field
from graphene.types.objecttype import ObjectType, ObjectTypeMeta


class DeleteMutationMeta(ObjectTypeMeta):

    def __new__(cls, name, bases, attrs):

        # Also ensure initialization is only performed for subclasses of
        # Mutation
        if not is_base_type(bases, DeleteMutationMeta):
            return type.__new__(cls, name, bases, attrs)

        cls = ObjectTypeMeta.__new__(cls, name, bases, attrs)
        input_class = getattr(cls, 'input_class', None)()

        field_args = props(input_class) if input_class else {}
        resolver = getattr(cls, 'mutate', None)
        assert resolver, 'All mutations must define a mutate method in it'
        resolver = get_unbound_function(resolver)
        cls.Field = partial(Field, cls, args=field_args, resolver=resolver)
        return cls


class DeleteMutation(six.with_metaclass(DeleteMutationMeta, ObjectType)):
    pass


class DeleteInput(graphene.InputObjectType):
    id = graphene.ID()


class DeleteModel(graphene.AbstractType):
    deleted = graphene.Boolean()

    @staticmethod
    def input_class():
        class Input:
            id = graphene.ID()
        return Input

    @classmethod
    def mutate(cls, root, args, context, info):
        try:
            cls.Config.model.objects.filter(id=args.get('id')).delete()
            deleted = True
        except:
            deleted = False
        return cls(deleted=deleted)


class BulkDeleteInput(graphene.InputObjectType):
    ids = graphene.types.json.JSONString


class BulkDeleteModel(graphene.AbstractType):
    deleted = graphene.Boolean()

    @staticmethod
    def input_class():
        class Input:
            id = graphene.ID()
        return Input

    @classmethod
    def mutate(cls, root, args, context, info):
        try:
            cls.Config.model.objects.filter(id=args.get('id')).delete()
            deleted = True
        except:
            deleted = False
        return cls(deleted=deleted)
