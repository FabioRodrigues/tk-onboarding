import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, screen, waitForElement, render, cleanup } from '@testing-library/react'
import App from '../App'
import {RecipeService} from '../recipe-service/recipe-service'
import { act } from 'react-dom/test-utils'
const recipe = {
  name: "pizza",
  id: 1,
  description: "desc",
  ingredients: [{ name: "cheese" }]
}


test('must add ingredients', async () => {
  jest.spyOn(RecipeService, 'list').mockImplementation(() => Promise.resolve([recipe]))
  jest.spyOn(RecipeService, 'save').mockImplementation(() => Promise.resolve({}))
  
  await act(async () => {render(<App />) })
  let newRecipe = recipe;
  newRecipe.name="kebab";
  newRecipe.description="turkish";
  await fireEvent.click(screen.queryByTestId("new-button"));
  await fireEvent.change(screen.getByTestId("name"), {target:{value:newRecipe.name}})
  await fireEvent.change(screen.getByTestId("description"), {target:{value:newRecipe.description}})
  await fireEvent.click(screen.getByTestId("save-button"))
  
  jest.spyOn(RecipeService, 'list').mockImplementation(() => Promise.resolve([newRecipe]))

  expect(await waitForElement(() => screen.queryByText(newRecipe.name))).toBeInTheDocument()
});