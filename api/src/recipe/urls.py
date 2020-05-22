from rest_framework_extensions.routers import ExtendedSimpleRouter

from . import views


'''
    this router creates the sub-resource ingredient to the recipe
    something like /recipe/{recipe_id}/ingredients
'''
router = ExtendedSimpleRouter(trailing_slash=False)
(
    router.register('restful_recipes', views.RestfulRecipeViewSet, basename='recipe')
    .register('ingredients',
              views.RestfulIngredientViewSet,
              basename='recipe-ingredients',
              parents_query_lookups=['recipe'])
)
router.register('recipes/', views.RecipeViewSet)

urlpatterns = router.urls
