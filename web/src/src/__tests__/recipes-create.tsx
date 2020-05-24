import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, screen, waitForElement, render, cleanup } from '@testing-library/react'
import App from '../App'
import {RecipeService} from '../recipe-service/recipe-service'
const recipe = {
  name: "pizza",
  id: 1,
  description: "desc",
  ingredients: [{ name: "cheese" }]
}

jest.mock('../recipe-service/recipe-service');



test('must create a recipe', async () => {
  RecipeService.list.mockReturnValue([]);
  
  const mockSave = jest.fn().mockReturnValue({})
  RecipeService.save.mockImplementationOnce(mockSave);
  
  render(<App />)
  
  await waitForElement(() => screen.queryByTestId('no-results'))
  await fireEvent.click(screen.getByTestId("new-button"));
  await waitForElement(() => screen.queryByTestId('save-button'))
  await fireEvent.change(screen.getByTestId("name"), {target:{value:recipe.name}})
  await fireEvent.change(screen.getByTestId("description"), {target:{value:recipe.description}})
  await fireEvent.change(screen.getByTestId("ingredient-add"), {target:{value:recipe.ingredients[0].name}})
  await fireEvent.keyDown(screen.getByTestId("ingredient-add"),{ key: 'Enter', code: 'Enter' })
  await fireEvent.click(screen.getByTestId("save-button"))
  expect(mockSave).toHaveBeenCalledWith({
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients
  })
  await waitForElement(() => screen.queryByTestId('no-results'))
});