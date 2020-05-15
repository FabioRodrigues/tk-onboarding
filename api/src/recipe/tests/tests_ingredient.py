from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

URL_RECIPES_LIST = '/recipes'


class TestIngredient(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.default_recipe = self._create_recipe('something')
        self.default_recipe_ingredient_url = f'{URL_RECIPES_LIST}/{self.default_recipe["id"]}/ingredients'

    def _create_recipe(self, name):
        payload = {'name': name}
        resp = self.client.post(URL_RECIPES_LIST, payload)
        return resp.data

    def _create_ingredient(self, name):
        resp = self.client.post(self.default_recipe_ingredient_url, {'name': name})
        return resp.data

    def test_should_return_bad_request_when_not_receiving_name_when_creating_ingredient(self):
        payload = {'name': ''}
        resp = self.client.post(self.default_recipe_ingredient_url, payload)

        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_return_not_found_when_not_receiving_recipe_when_creating_ingredient(self):
        payload = {'name': 'pizza'}
        resp = self.client.post(f'{URL_RECIPES_LIST}/0/ingredients', payload)

        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_should_create_ingredient_when_passing_name_and_recipe(self):
        payload = {'name': 'pizza'}
        resp = self.client.post(self.default_recipe_ingredient_url, payload)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_should_view_an_ingredient_when_receiving_an_existent_id(self):
        cheese = self._create_ingredient('cheese')
        resp = self.client.get(f'{self.default_recipe_ingredient_url}/{cheese["id"]}')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['name'], 'cheese')
