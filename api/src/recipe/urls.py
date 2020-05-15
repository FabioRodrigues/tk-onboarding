from rest_framework_extensions.routers import ExtendedSimpleRouter

from . import views


'''
    this router creates the sub-resource ingredient to the recipe
    something like /recipe/{recipe_id}/ingredients
'''
router = ExtendedSimpleRouter(trailing_slash=False)
(
    router.register('restful_recipes', views.RecipeViewSet, basename='recipe')
    .register('ingredients',
              views.IngredientViewSet,
              basename='recipe-ingredients',
              parents_query_lookups=['recipe'])
)
router.register('recipes', views.RecipeNestedViewSet)

urlpatterns = router.urls
