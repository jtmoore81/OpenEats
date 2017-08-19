#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType

from v1.common.internal_id_node import InternalIdNode
from .models import Ingredient, IngredientGroup


class IngredientGroupNode(DjangoObjectType):
    class Meta:
        model = IngredientGroup
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class IngredientGroupQuery(AbstractType):
    ingredientgroup = InternalIdNode.Field(IngredientGroupNode)
    all_ingredientgroups = DjangoFilterConnectionField(IngredientGroupNode)


class IngredientNode(DjangoObjectType):
    class Meta:
        model = Ingredient
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class IngredientQuery(AbstractType):
    ingredient = InternalIdNode.Field(IngredientNode)
    all_ingredients = DjangoFilterConnectionField(IngredientNode)
