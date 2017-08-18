#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType


from v1.common.internal_id_node import InternalIdNode
from .models import Recipe, Direction, SubRecipe


class RecipeNode(DjangoObjectType):
    class Meta:
        model = Recipe
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class RecipeQuery(AbstractType):
    recipe = InternalIdNode.Field(RecipeNode)
    all_recipes = DjangoFilterConnectionField(RecipeNode)
