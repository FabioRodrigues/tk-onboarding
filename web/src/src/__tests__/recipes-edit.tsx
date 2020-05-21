import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, screen, waitForElement, render, cleanup, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App'
import { RecipeService } from '../recipe-service/recipe-service'
import { act } from 'react-dom/test-utils'


beforeAll(() => {
  jest.spyOn(RecipeService, 'update').mockImplementation(() => Promise.resolve({}))
  jest.spyOn(window, 'alert').mockImplementation(() => { });
})


afterEach(() => {
  cleanup()
})


test('must detail a recipe', async () => {
  const recipe = {
    name: "pizza",
    id: 3,
    description: "desc",
    ingredients: [{ name: "cheese" }]
  }

  const mockGet = jest.fn()
  .mockReturnValue(Promise.resolve(recipe));

  jest.spyOn(RecipeService, 'list').mockImplementation(() => Promise.resolve([recipe]))
  await act(async () => { render(<App />) })

  const item = await waitForElement(() => screen.getByText(recipe.name))
  jest.spyOn(RecipeService, 'get').mockImplementation(mockGet)
    
  await act(async () => { await fireEvent.click(item); })
  

  expect(await waitForElement(() => screen.getByDisplayValue(recipe.name))).toBeInTheDocument()
  expect(await waitForElement(() => screen.getByDisplayValue(recipe.description))).toBeInTheDocument()
  expect(mockGet).toHaveBeenCalledWith(recipe.id.toString())
});



test('must edit a recipe', async () => {
  const recipe = {
    name: "pizza",
    id: 3,
    description: "desc",
    ingredients: [{ name: "cheese" }]
  }

  jest.spyOn(RecipeService, 'get').mockImplementation(() => Promise.resolve(recipe))
  jest.spyOn(RecipeService, 'list').mockImplementation(() => Promise.resolve([recipe]));
  const mockUpdate = jest.fn().mockReturnValue({});
  jest.spyOn(RecipeService, 'update').mockImplementation(mockUpdate);

  await act(async () => { render(<App />) })

  let edit = await waitForElement(() => screen.queryByTestId("edit"))
  await act(async () => { await fireEvent.click(edit) })
  let name = await waitForElement(() => screen.queryByTestId("name"))

  let newRecipeName = 'pizza2'

  await fireEvent.change(name, { target: { value: newRecipeName } });

  await fireEvent.click(screen.getByTestId("save-button"));


  expect(await waitForElement(() => screen.getByText('Delete'))).toBeInTheDocument();
  let expectedUpdatePayload = {
    name: newRecipeName,
    description: recipe.description,
    ingredients: recipe.ingredients
  };

  expect(mockUpdate).toHaveBeenCalledWith(recipe.id.toString(), expectedUpdatePayload);
});




