#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType

from v1.common.internal_id_node import InternalIdNode
from v1.common.total_count import connection_for_type
from .models import GroceryList, GroceryItem


class GroceryListNode(DjangoObjectType):
    class Meta:
        model = GroceryList
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class GroceryListQuery(AbstractType):
    grocery_list = InternalIdNode.Field(GroceryListNode)
    all_grocery_lists = DjangoFilterConnectionField(GroceryListNode)


class GroceryItemNode(DjangoObjectType):
    class Meta:
        model = GroceryItem
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']

GroceryItemNode.Connection = connection_for_type(GroceryItemNode)


class GroceryItemQuery(AbstractType):
    grocery_item = InternalIdNode.Field(GroceryItemNode)
    all_grocery_items = DjangoFilterConnectionField(GroceryItemNode)
