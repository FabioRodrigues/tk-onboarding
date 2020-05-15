from django.contrib import admin
from .core.models import Recipe, Ingredient
# Register your models here.
admin.register(Recipe)
admin.register(Ingredient)
