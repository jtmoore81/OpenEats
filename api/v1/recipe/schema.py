#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType

from v1.common.internal_id_node import InternalIdNode
from v1.common.total_count import connection_for_type
from .models import Recipe, Direction, SubRecipe


class RecipeNode(DjangoObjectType):
    class Meta:
        model = Recipe
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']

RecipeNode.Connection = connection_for_type(RecipeNode)


class RecipeQuery(AbstractType):
    recipe = InternalIdNode.Field(RecipeNode)
    all_recipes = DjangoFilterConnectionField(RecipeNode)


class DirectionNode(DjangoObjectType):
    class Meta:
        model = Direction
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class DirectionQuery(AbstractType):
    direction = InternalIdNode.Field(DirectionNode)
    all_directions = DjangoFilterConnectionField(DirectionNode)


class SubRecipeNode(DjangoObjectType):
    class Meta:
        model = SubRecipe
        interfaces = (InternalIdNode, )


class SubRecipeQuery(AbstractType):
    sub_recipe = InternalIdNode.Field(SubRecipeNode)
    all_sub_recipes = DjangoFilterConnectionField(SubRecipeNode)
