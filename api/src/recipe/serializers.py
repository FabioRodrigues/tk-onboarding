from core.models import Recipe, Ingredient
from rest_framework import serializers


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('name',)
        read_only_fields = ('id',)

class RestfulIngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('name', 'id')
        read_only_fields = ('id',)        


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'name')
        read_only_fields = ('id',)


class RecipeNestedSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(
        many=True
    )

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'ingredients')
        read_only_fields = ('id',)

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        
        for i in ingredients:
            Ingredient.objects.create(recipe=recipe, **i)

        return recipe

    def update(self, instance, validated_data):
        ingredients = validated_data.pop('ingredients')

        instance.ingredients.all().delete()

        for i in ingredients:
            Ingredient.objects.create(recipe=instance, **i)
    
        return instance
