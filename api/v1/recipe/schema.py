#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
import graphene

from v1.common.internal_id_node import InternalIdNode
from v1.common.total_count import connection_for_type
from .models import Recipe, Direction, SubRecipe


class RecipeNode(DjangoObjectType):
    class Meta:
        model = Recipe
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']

RecipeNode.Connection = connection_for_type(RecipeNode)


class RecipeQuery(graphene.AbstractType):
    recipe = InternalIdNode.Field(RecipeNode)
    all_recipes = DjangoFilterConnectionField(RecipeNode)


class DirectionNode(DjangoObjectType):
    class Meta:
        model = Direction
        interfaces = (InternalIdNode, )
        filter_fields = ['id', 'title']


class DirectionQuery(graphene.AbstractType):
    direction = InternalIdNode.Field(DirectionNode)
    all_directions = DjangoFilterConnectionField(DirectionNode)


class SubRecipeNode(DjangoObjectType):
    class Meta:
        model = SubRecipe
        interfaces = (InternalIdNode, )


class SubRecipeQuery(graphene.AbstractType):
    sub_recipe = InternalIdNode.Field(SubRecipeNode)
    all_sub_recipes = DjangoFilterConnectionField(SubRecipeNode)


class CreateDirection(graphene.Mutation):
    class Input:
        # recipe = graphene.Int()
        step = graphene.Int()
        title = graphene.String()

    direction = graphene.Field(lambda: DirectionNode)

    @staticmethod
    def mutate(root, args, context, info):
        title = args.get('title')
        # recipe = args.get('recipe')
        step = args.get('step')
        direction, created = Direction.objects.get_or_create(
            # recipe=recipe,
            title=title,
            step=step
        )
        direction.save()
        return CreateDirection(direction=direction)


class DirectionMutations(graphene.AbstractType):
    create_direction = CreateDirection.Field()


class CreateRecipe(graphene.Mutation):
    class Input:
        title = graphene.String()

        # author = models.ForeignKey(User, verbose_name=_('user'), null=True)
        # photo = models.ImageField(_('photo'), blank=True, upload_to="upload/recipe_photos")
        # cuisine = models.ForeignKey(Cuisine, verbose_name=_('cuisine'))
        # course = models.ForeignKey(Course, verbose_name=_('course'))
        # tags = models.ManyToManyField(Tag, verbose_name=_('tag'), blank=True)
        # subrecipes = models.ManyToManyField('self', verbose_name=_('subrecipes'), through='SubRecipe',
        #                                     symmetrical=False)
        info = graphene.String()
        source = graphene.String()
        prep_time = graphene.Int()
        cook_time = graphene.Int()
        servings = graphene.Int()
        rating = graphene.Int()
        # direction = graphene.Argument()

    recipe = graphene.Field(lambda: RecipeNode)

    @staticmethod
    def mutate(root, args, context, info):
        print context.user
        print args.get('title')
        title = args.get('title')
        info = args.get('info')
        source = args.get('source')
        prep_time = args.get('prep_time')
        cook_time = args.get('cook_time')
        servings = args.get('servings')
        rating = args.get('rating')

        recipe, created = Recipe.objects.get_or_create(
            title=title,
            info=info,
            source=source,
            prep_time=prep_time,
            cook_time=cook_time,
            servings=servings,
            rating=rating,
            cuisine_id=1,
            course_id=1,
        )
        recipe.save()
        return CreateRecipe(recipe=recipe)


class RecipeMutations(graphene.AbstractType):
    create_recipe = CreateRecipe.Field()
