#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene import ObjectType, Field, Schema
from graphene_django.debug import DjangoDebug
from v1.recipe.schema import RecipeQuery, DirectionQuery
from v1.recipe_groups.schema import TagQuery, CourseQuery, CuisineQuery


class Query(
    RecipeQuery,
    DirectionQuery,
    TagQuery,
    CourseQuery,
    CuisineQuery,
    ObjectType,
):
    debug = Field(DjangoDebug, name='__debug')


schema = Schema(query=Query)

"""



query {
  allCourses {
    edges {
      node {
        title
        recipeSet {
          totalCount
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
}



query {
  allRecipes(first:2) {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }

  recipe(id: "4") {
    title
  }
}

query {
  allRecipes {
    edges {
      node {
        title
      }
    }
  }
}

query loadRecipeById($id: recipes){
  recipes(recipes: $id) {
    title
  }
}



query CreateRecipeById($id: id!, $recipe: recipe!){
  createRecipe(id: $id, recipe: $recipe) {
    title
  }
}

{
  "id": "4",
  "recipe": {
    "title": "asd",
  }
}"""