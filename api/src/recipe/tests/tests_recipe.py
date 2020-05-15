from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

URL_RECIPES_LIST = '/recipes'


class TestRecipe(TestCase):
    def setUp(self):
        self.client = APIClient()

    def _create_recipe(self, name):
        payload = {'name': name}
        resp = self.client.post(URL_RECIPES_LIST, payload)
        return resp.data

    def _create_ingredient(self, recipe_id, name):
        ingredients_url = f'{URL_RECIPES_LIST}/{recipe_id}/ingredients'
        resp = self.client.post(ingredients_url, {'name': name})
        return resp.data

    def test_should_return_a_bad_request_when_creating_recipe_without_name(self):
        payload = {'name': ""}
        resp = self.client.post(URL_RECIPES_LIST, payload)

        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_create_a_recipe_when_receiving_a_name(self):
        payload = {'name': "pad-thai"}
        resp = self.client.post(URL_RECIPES_LIST, payload)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_should_view_a_recipe_when_passing_an_existing_id(self):
        name = 'pizza'
        recipe = self._create_recipe(name)
        resp = self.client.get(f'{URL_RECIPES_LIST}/{recipe["id"]}')

        self.assertEqual(resp.data['name'], name)

    def test_should_show_no_ingredients_when_recipe_doesnt_have_ingredients(self):
        recipe = self._create_recipe('pizza')
        resp = self.client.get(f'{URL_RECIPES_LIST}/{recipe["id"]}/ingredients')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 0)

    def test_should_add_one_ingredient_when_receiving_a_name_for_ingredient_and_a_recipe(self):
        recipe = self._create_recipe('pizza')
        ingredients_url = f'{URL_RECIPES_LIST}/{recipe["id"]}/ingredients'
        payload = {'name': 'double-cheese'}

        resp = self.client.post(ingredients_url, payload)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_should_list_one_ingredient_when_a_recipe_has_one_ingredient(self):
        recipe = self._create_recipe('pizza')
        self._create_ingredient(recipe['id'], 'cheese')

        resp = self.client.get(f'{URL_RECIPES_LIST}/{recipe["id"]}/ingredients')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)

    def test_should_not_list_ingredients_from_another_recipe(self):
        pizza = self._create_recipe('pizza')
        lasagna = self._create_recipe('lasagna')

        # cheese for pizza
        pizza_cheese = self._create_ingredient(pizza['id'], 'cheese')
        # cheese for lasagna
        self._create_ingredient(lasagna['id'], 'cheese')

        resp = self.client.get(f'{URL_RECIPES_LIST}/{pizza["id"]}/ingredients')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)
        self.assertEqual(resp.data[0]['id'], pizza_cheese['id'])
