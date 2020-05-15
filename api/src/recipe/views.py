
from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .serializers import RestfulRecipeSerializer, RestfulIngredientSerializer, RecipeSerializer
from core.models import Recipe, Ingredient


class RestfulIngredientViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = RestfulIngredientSerializer
    queryset = Ingredient.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            recipe_id = self.get_parents_query_dict()['recipe']
            Recipe.objects.get(id=recipe_id)
            return super().create(request, *args, **kwargs)

        except Recipe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        recipe_id = self.get_parents_query_dict()['recipe']
        serializer.save(recipe_id=recipe_id)


class RestfulRecipeViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = RestfulRecipeSerializer
    queryset = Recipe.objects.all()


class RecipeViewSet(ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
        
    def perform_create(self, serializer):
        with transaction.atomic():
            return super().perform_create(serializer)

    def perform_update(self, serializer):
        with transaction.atomic():
            return super().perform_update(serializer)
