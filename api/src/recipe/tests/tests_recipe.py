from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

URL_RECIPES_LIST = '/recipes'


class TestRecipe(TestCase):
    def setUp(self):
        self.client = APIClient()

    def _create_recipe(self, name, ingredients):
        payload = {'name': name, 'ingredients': ingredients}
        resp = self.client.post(URL_RECIPES_LIST, payload, format='json')
        return resp.data

    def test_should_return_a_bad_request_when_creating_recipe_without_name(self):
        payload = {'name': ""}
        resp = self.client.post(URL_RECIPES_LIST, payload)

        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_create_a_recipe_when_receiving_a_name(self):
        list = []
        payload = {'name': "pad-thai", 'ingredients':[{'name':'egg'}]}

        resp = self.client.post(URL_RECIPES_LIST, payload,format='json')
        print(resp.data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_should_view_a_recipe_when_passing_an_existing_id(self):
        name = 'pizza'
        recipe = self._create_recipe(name, ingredients=[{'name':'misterious ingredient'}])
        resp = self.client.get(f'{URL_RECIPES_LIST}/{recipe["id"]}')

        self.assertEqual(resp.data['name'], name)

    def test_should_show_no_ingredients_when_recipe_doesnt_have_ingredients(self):
        recipe = self._create_recipe('pizza', ingredients=[])
        resp = self.client.get(f'{URL_RECIPES_LIST}/{recipe["id"]}')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data['ingredients']), 0)

    def test_should_add_one_ingredient_when_passing_one_ingredient_for_a_recipe(self):
        recipe = self._create_recipe('pizza',ingredients=[{'name':'sliced tomatoes'}])

        self.assertEqual(len(recipe['ingredients']), 1)

    def test_should_not_list_ingredients_from_another_recipe(self):
        pizza = self._create_recipe('pizza', ingredients=[{'name': 'cheese'}])
        lasagna = self._create_recipe('lasagna', ingredients=[{'name': 'tomato'}])


        resp = self.client.get(f'{URL_RECIPES_LIST}/{pizza["id"]}')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data['ingredients']), 1)
        self.assertEqual(resp.data['ingredients'][0]['name'], 'cheese')

    def test_should_remove_a_recipe(self):
        recipe = self._create_recipe('pizza', ingredients=[{'name': 'sliced tomatoes'}])
        recipe_url = f'{URL_RECIPES_LIST}/{recipe["id"]}'

        resp = self.client.delete(recipe_url)
        get_resp = self.client.get(recipe_url)

        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(get_resp.status_code, status.HTTP_404_NOT_FOUND)
