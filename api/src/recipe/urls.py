# from rest_framework_extensions.routers import ExtendedSimpleRouter
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


'''
    this router creates the sub-resource ingredient to the recipe
    something like /recipe/{recipe_id}/ingredients
'''
router = DefaultRouter()
router.register('recipes', views.RecipeViewSet)

urlpatterns = [
    path('',include(router.urls))
]


# router = ExtendedSimpleRouter(trailing_slash=False)
# (
#     router.register('restful_recipes', views.RestfulRecipeViewSet, basename='recipe')
#     .register('ingredients',
#               views.RestfulIngredientViewSet,
#               basename='recipe-ingredients',
#               parents_query_lookups=['recipe'])
# )
# router.register('recipes/', views.RecipeViewSet)

# urlpatterns = router.urls