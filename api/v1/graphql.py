#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django import DjangoObjectType
import graphene
from django.contrib.auth.models import User as UserModel

from recipe.models import Recipe, Direction, SubRecipe
from recipe_groups.models import Course, Cuisine, Tag
from news.models import News
from ingredient.models import IngredientGroup, Ingredient
from list.models import GroceryList, GroceryItem


class User(DjangoObjectType):
    class Meta:
        model = UserModel


class NewsObject(DjangoObjectType):
    class Meta:
        model = News


class GroceryListObject(DjangoObjectType):
    class Meta:
        model = GroceryList


class GroceryItemObject(DjangoObjectType):
    class Meta:
        model = GroceryItem


class CourseObject(DjangoObjectType):
    class Meta:
        model = Course


class CuisineObject(DjangoObjectType):
    class Meta:
        model = Cuisine


class TagObject(DjangoObjectType):
    class Meta:
        model = Tag


class RecipeObject(DjangoObjectType):
    class Meta:
        model = Recipe


class SubRecipeObject(DjangoObjectType):
    class Meta:
        model = SubRecipe


class DirectionObject(DjangoObjectType):
    class Meta:
        model = Direction


class IngredientGroupObject(DjangoObjectType):
    class Meta:
        model = IngredientGroup


class IngredientObject(DjangoObjectType):
    class Meta:
        model = Ingredient


class Query(graphene.ObjectType):
    users = graphene.List(User)
    news = graphene.List(NewsObject)
    grocery_lists = graphene.List(GroceryListObject)
    grocery_items = graphene.List(GroceryItemObject)
    courses = graphene.List(CourseObject)
    cuisines = graphene.List(CuisineObject)
    tags = graphene.List(TagObject)
    recipes = graphene.List(RecipeObject)
    subrecipes = graphene.List(SubRecipeObject)
    directions = graphene.List(DirectionObject)
    ingredient_groups = graphene.List(IngredientGroupObject)
    ingredients = graphene.List(IngredientObject)

    @graphene.resolve_only_args
    def resolve_users(self):
        return UserModel.objects.all()

    @graphene.resolve_only_args
    def resolve_news(self):
        return News.objects.all()

    @graphene.resolve_only_args
    def resolve_grocery_lists(self):
        return GroceryList.objects.all()

    @graphene.resolve_only_args
    def resolve_grocery_items(self):
        return GroceryItem.objects.all()

    @graphene.resolve_only_args
    def resolve_courses(self):
        return Course.objects.all()

    @graphene.resolve_only_args
    def resolve_cuisines(self):
        return Cuisine.objects.all()

    @graphene.resolve_only_args
    def resolve_tags(self):
        return Tag.objects.all()

    @graphene.resolve_only_args
    def resolve_recipes(self):
        return Recipe.objects.all()

    @graphene.resolve_only_args
    def resolve_subrecipes(self):
        return Recipe.objects.all()

    @graphene.resolve_only_args
    def resolve_directions(self):
        return Direction.objects.all()

    @graphene.resolve_only_args
    def resolve_ingredient_groups(self):
        return IngredientGroup.objects.all()

    @graphene.resolve_only_args
    def resolve_ingredients(self):
        return Ingredient.objects.all()

schema = graphene.Schema(query=Query)