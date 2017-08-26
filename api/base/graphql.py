#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene import ObjectType, Field, Schema
from graphene_django.debug import DjangoDebug
from v1.recipe.schema import RecipeQuery, RecipeMutations
from v1.recipe_groups.schema import RecipeGroupQuery, RecipeGroupMutations
from v1.news.schema import NewsQuery
from v1.ingredient.schema import IngredientQuery, IngredientMutations
from v1.list.schema import ListQuery, ListMutations


class Query(
    NewsQuery,
    RecipeQuery,
    RecipeGroupQuery,
    IngredientQuery,
    ListQuery,
    ObjectType,
):
    debug = Field(DjangoDebug, name='__debug')


class Mutation(
    RecipeMutations,
    RecipeGroupMutations,
    IngredientMutations,
    ListMutations,
    ObjectType
):
    pass

schema = Schema(query=Query, mutation=Mutation)

