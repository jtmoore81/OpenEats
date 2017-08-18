#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene import Node


class InternalIdNode(Node):
    """ 
    Custom node to get rid of global id.
    Replace it with the DB id.
    """
    class Meta:
        name = 'Node'

    @staticmethod
    def to_global_id(type, id):
        return id

    @staticmethod
    def get_node_from_global_id(id, context, info, only_type=None):
        return info.return_type.graphene_type._meta.model.objects.get(id=id)
