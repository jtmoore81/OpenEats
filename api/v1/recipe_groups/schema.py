#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
import graphene

from v1.common.internal_id_node import InternalIdNode
from v1.common.deletion import DeleteModel, DeleteMutation
from .models import Tag, Course, Cuisine


class TagNode(DjangoObjectType):
    class Meta:
        model = Tag
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class CourseNode(DjangoObjectType):
    class Meta:
        model = Course
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class CuisineNode(DjangoObjectType):
    class Meta:
        model = Cuisine
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class RecipeGroupQuery(graphene.AbstractType):
    cuisine = InternalIdNode.Field(CuisineNode)
    all_cuisines = DjangoFilterConnectionField(CuisineNode)
    course = InternalIdNode.Field(CourseNode)
    all_courses = DjangoFilterConnectionField(CourseNode)
    tag = InternalIdNode.Field(TagNode)
    all_tags = DjangoFilterConnectionField(TagNode)


class DeleteCuisine(DeleteModel, DeleteMutation):
    class Config:
        model = Tag


class CreateCuisine(graphene.Mutation):
    class Input:
        title = graphene.String()

    cuisine = graphene.Field(lambda: CuisineNode)

    @staticmethod
    def mutate(root, args, context, info):
        title = args.get('title')
        cuisine, created = Cuisine.objects.get_or_create(title=title)
        cuisine.save()
        return CreateCuisine(cuisine=cuisine)


class RecipeGroupMutations(graphene.AbstractType):
    delete_cuisine = DeleteCuisine.Field()
    create_cuisine = CreateCuisine.Field()
