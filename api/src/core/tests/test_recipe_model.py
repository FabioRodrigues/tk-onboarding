from django.test import TestCase
from core import models


class RecipeModelTest(TestCase):
    def test_should_not_create_a_recipe_when_not_receiving_ingredients(self):
        recipe = models.Recipe.objects.create(name="brazilian meal")

        rice = models.Ingredient.objects.create(name="rice", recipe=recipe)
        bean = models.Ingredient.objects.create(name="bean", recipe=recipe)

        print(recipe.id)
        print(recipe.ingredient_set.count())
        print(recipe.ingredient_set.filter(name="bean")[0].name)
