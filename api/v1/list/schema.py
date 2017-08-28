#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
import graphene

from v1.common.internal_id_node import InternalIdNode
from v1.common.total_count import total_count
from v1.common.deletion import DeleteModel, DeleteMutation, BulkDeleteModel
from .models import GroceryList, GroceryItem


class GroceryListNode(DjangoObjectType):
    class Meta:
        model = GroceryList
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'author']


class GroceryItemNode(DjangoObjectType):
    class Meta:
        model = GroceryItem
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'list__title', 'list__id']

GroceryItemNode.Connection = total_count(GroceryItemNode)


class ListQuery(graphene.AbstractType):
    grocery_list = InternalIdNode.Field(GroceryListNode)
    all_grocery_lists = DjangoFilterConnectionField(GroceryListNode)
    grocery_item = InternalIdNode.Field(GroceryItemNode)
    all_grocery_items = DjangoFilterConnectionField(GroceryItemNode)


class GroceryListInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()


class CreateGroceryList(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryListInput)

    grocery_list = graphene.Field(lambda: GroceryListNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        title = args.get('data').get('title')
        grocery_list = GroceryList.objects.create(title=title, author_id=1)
        grocery_list.save()
        return CreateGroceryList(grocery_list=grocery_list)


class UpdateGroceryList(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryListInput)

    grocery_list = graphene.Field(lambda: GroceryListNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        key = args.get('data').get('id')
        title = args.get('data').get('title')
        grocery_list = GroceryList.objects.get(id=key)
        grocery_list.title = title
        grocery_list.save()
        return UpdateGroceryList(grocery_list=grocery_list)


class DeleteGroceryList(DeleteModel, DeleteMutation):
    class Config:
        model = GroceryList


class BulkDeleteGroceryList(BulkDeleteModel, DeleteMutation):
    class Config:
        model = GroceryList


class GroceryItemInput(graphene.InputObjectType):
    id = graphene.ID()
    list = graphene.ID()
    title = graphene.String()
    completed = graphene.Boolean()


class CreateGroceryItem(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryItemInput)

    grocery_item = graphene.Field(lambda: GroceryItemNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        list_id = args.get('data').get('list')
        title = args.get('data').get('title')
        grocery_item = GroceryItem.objects.create(title=title, list_id=list_id)
        grocery_item.save()
        return CreateGroceryItem(grocery_item=grocery_item)


class UpdateGroceryItem(graphene.Mutation):
    class Input:
        data = graphene.Argument(GroceryItemInput)

    grocery_item = graphene.Field(lambda: GroceryItemNode)

    @staticmethod
    def mutate(root, args, context, info, model=None):
        key = args.get('data').get('id')
        list_id = args.get('data').get('list')
        title = args.get('data').get('title')
        completed = args.get('data').get('completed')
        grocery_item = GroceryItem.objects.get(id=key)
        if list_id:
            grocery_item.list_id = list_id
        if title:
            grocery_item.title = title
        if completed is not None:
            grocery_item.completed = completed
        grocery_item.save()
        return UpdateGroceryItem(grocery_item=grocery_item)


class DeleteGroceryItem(DeleteModel, DeleteMutation):
    class Config:
        model = GroceryItem


class BulkDeleteGroceryItem(BulkDeleteModel, DeleteMutation):
    class Config:
        model = GroceryItem


class ListMutations(graphene.AbstractType):
    create_grocery_list = CreateGroceryList.Field()
    update_grocery_list = UpdateGroceryList.Field()
    delete_grocery_list = DeleteGroceryList.Field()
    bulk_delete_grocery_list = BulkDeleteGroceryList.Field()
    create_grocery_item = CreateGroceryItem.Field()
    update_grocery_item = UpdateGroceryItem.Field()
    delete_grocery_item = DeleteGroceryItem.Field()
    bulk_delete_grocery_item = BulkDeleteGroceryItem.Field()
