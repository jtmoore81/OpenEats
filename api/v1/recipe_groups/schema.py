#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType

from v1.common.internal_id_node import InternalIdNode
from .models import Tag, Course, Cuisine


class TagNode(DjangoObjectType):
    class Meta:
        model = Tag
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class TagQuery(AbstractType):
    tag = InternalIdNode.Field(TagNode)
    all_tags = DjangoFilterConnectionField(TagNode)


class CourseNode(DjangoObjectType):
    class Meta:
        model = Course
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class CourseQuery(AbstractType):
    course = InternalIdNode.Field(CourseNode)
    all_courses = DjangoFilterConnectionField(CourseNode)


class CuisineNode(DjangoObjectType):
    class Meta:
        model = Cuisine
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class CuisineQuery(AbstractType):
    cuisine = InternalIdNode.Field(CuisineNode)
    all_cuisines = DjangoFilterConnectionField(CuisineNode)
