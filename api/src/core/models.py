from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=255, null=True)


class Ingredient(models.Model):
    name = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredients")
