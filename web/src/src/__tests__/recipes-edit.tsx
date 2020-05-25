import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, screen, waitForElement, render, wait } from '@testing-library/react'
import App from '../App'
import { RecipeService } from '../recipe-service/recipe-service'

jest.mock('../recipe-service/recipe-service');

const recipe = {
  name: "pizza",
  id: 3,
  description: "desc",
  ingredients: [{ name: "cheese" }]
}

test('must detail a recipe', async () => {
  const mockGet = jest.fn().mockReturnValue(recipe);
  RecipeService.list.mockReturnValue([recipe]);
  RecipeService.get.mockImplementation(mockGet)

  render(<App />)

  const item = await waitForElement(() => screen.getByText(recipe.name))
  await wait(() => fireEvent.click(item))
  
  expect(await waitForElement(() => screen.getByDisplayValue(recipe.name))).toBeInTheDocument()
  expect(await waitForElement(() => screen.getByDisplayValue(recipe.description))).toBeInTheDocument()
  expect(mockGet).toHaveBeenCalledWith(recipe.id.toString())
});



test('must edit a recipe', async () => {
  const mockUpdate = jest.fn().mockReturnValue({});
  RecipeService.list.mockReturnValue([recipe]);
  RecipeService.get.mockReturnValue(recipe);
  RecipeService.update.mockImplementation(mockUpdate);

  render(<App />)

  let edit = await waitForElement(() => screen.queryByTestId("edit"))
  await wait(() => fireEvent.click(edit))

  let name = await waitForElement(() => screen.queryByTestId("name"))
  let description = await waitForElement(() => screen.queryByTestId("description"))

  let newRecipeName = 'pizza2'
  let newDescription = 'description 2'

  await fireEvent.change(name, { target: { value: newRecipeName } });
  await fireEvent.change(description, { target: { value: newDescription} });

  await wait(() => fireEvent.click(screen.getByTestId("save-button")));

  let expectedUpdatePayload = {
    name: newRecipeName,
    description: newDescription,
    ingredients: recipe.ingredients
  };

  expect(mockUpdate).toHaveBeenCalledWith(recipe.id.toString(), expectedUpdatePayload);
  
});




