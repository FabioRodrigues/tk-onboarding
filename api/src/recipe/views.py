
from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.mixins import NestedViewSetMixin

from .serializers import RecipeSerializer, IngredientSerializer
from core.models import Recipe, Ingredient


class IngredientViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def perform_create(self, serializer):
        serializer.save(recipe_id=self.get_parents_query_dict()['recipe'])


class RecipeViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
