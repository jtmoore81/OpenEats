#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene import Scalar
from graphql.language import ast


class List(Scalar):
    """
    The `List` scalar type represents a python list.
    """

    parse_value = list

    @staticmethod
    def serialize(array):
        array = array[1:-1]
        return [x.strip() for x in array.split(',')]

    @staticmethod
    def parse_literal(node):
        if isinstance(node, ast.StringValue):
            return node.value
