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


class GroceryCuisineInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()


class CreateCuisine(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryCuisineInput)

    cuisine = graphene.Field(lambda: CuisineNode)

    @staticmethod
    def mutate(root, args, context, info):
        title = args.get('data').get('title')
        cuisine, created = Cuisine.objects.get_or_create(title=title)
        cuisine.save()
        return CreateCuisine(cuisine=cuisine)


class DeleteCuisine(DeleteModel, DeleteMutation):
    class Config:
        model = Cuisine


class GroceryCourseInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()


class CreateCourse(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryCuisineInput)

    course = graphene.Field(lambda: CourseNode)

    @staticmethod
    def mutate(root, args, context, info):
        title = args.get('data').get('title')
        course, created = Course.objects.get_or_create(title=title)
        course.save()
        return CreateCourse(course=course)


class DeleteCourse(DeleteModel, DeleteMutation):
    class Config:
        model = Course


class RecipeGroupMutations(graphene.AbstractType):
    create_cuisine = CreateCuisine.Field()
    delete_cuisine = DeleteCuisine.Field()
    create_course = CreateCourse.Field()
    delete_course = DeleteCourse.Field()
