from django.urls import include, path
from django.conf.urls import include, url
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter

from . import views


router = ExtendedSimpleRouter()
(
    router.register('recipes', views.RecipeViewSet, basename='recipe')
    .register('ingredients',
              views.IngredientViewSet,
              basename='recipe-ingredients',
              parents_query_lookups=['recipe'])
)


urlpatterns = router.urls
