#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
import graphene

from v1.common.internal_id_node import InternalIdNode
from v1.common.total_count import connection_for_type
from .models import GroceryList, GroceryItem


class GroceryListNode(DjangoObjectType):
    class Meta:
        model = GroceryList
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class GroceryItemNode(DjangoObjectType):
    class Meta:
        model = GroceryItem
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']

GroceryItemNode.Connection = connection_for_type(GroceryItemNode)


class ListQuery(graphene.AbstractType):
    grocery_list = InternalIdNode.Field(GroceryListNode)
    all_grocery_lists = DjangoFilterConnectionField(GroceryListNode)
    grocery_item = InternalIdNode.Field(GroceryItemNode)
    all_grocery_items = DjangoFilterConnectionField(GroceryItemNode)







class GroceryListInput(graphene.InputObjectType):
    title = graphene.String()


class CreateGroceryList(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryListInput)

    grocery_list = graphene.Field(lambda: GroceryListNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        title = args.get('data').get('title')
        grocery_list = GroceryList.objects.create(title=title)
        grocery_list.save()
        return CreateGroceryList(grocery_list=grocery_list)


class UpdateGroceryList(graphene.Mutation):
    class Input:
        key = graphene.ID()
        data = graphene.Argument(GroceryListInput)

    grocery_list = graphene.Field(lambda: GroceryListNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        key = args.get('key')
        title = args.get('data').get('title')
        grocery_list = GroceryList.objects.get(id=key)
        grocery_list.title = title
        grocery_list.save()
        return UpdateGroceryList(grocery_list=grocery_list)


class ListMutations(graphene.AbstractType):
    create_grocery_list = CreateGroceryList.Field()
    update_grocery_list = UpdateGroceryList.Field()
