#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from graphene import AbstractType

from v1.common.internal_id_node import InternalIdNode
from .models import News


class NewsNode(DjangoObjectType):
    class Meta:
        model = News
        interfaces = (InternalIdNode, )


class NewsQuery(AbstractType):
    news = InternalIdNode.Field(NewsNode)
    all_news = DjangoFilterConnectionField(NewsNode)
