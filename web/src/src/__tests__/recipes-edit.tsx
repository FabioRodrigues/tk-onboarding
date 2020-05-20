import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import { fireEvent, screen, waitForElement, render, cleanup, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App'


const originalError = console.error
beforeAll(() => {
  jest.mock('axios');
  jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve({ data: {}}))
  jest.spyOn(window, 'alert').mockImplementation(() => { });
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
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
  
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [recipe] }))
  render(<App />)
  const item = await waitForElement(() => screen.getByText(recipe.name))
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: recipe }))
  await fireEvent.click(item);

  expect(await waitForElement(() => screen.getByDisplayValue(recipe.name))).toBeInTheDocument()
  expect(await waitForElement(() => screen.getByDisplayValue(recipe.description))).toBeInTheDocument()
});



test('must edit a recipe', async () => {
  const recipe = {
    name: "pizza",
    id: 4,
    description: "desc",
    ingredients: [{ name: "cheese" }]
  }

  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: recipe }))
  render(<App />)
  
  let edit = await waitForElement(()=> screen.queryByTestId("edit"))
  await fireEvent.click(edit)
  let name = await waitForElement(() => screen.queryByTestId("name"))
  
  let newRecipe = recipe;
  newRecipe.name='pizza2'
  await fireEvent.change(name, {target:{value:newRecipe.name}});
  
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [newRecipe]}))
  await fireEvent.click(screen.getByTestId("save-button"))
  
  
  expect(await waitForElement(() => screen.getByText('Delete'))).toBeInTheDocument()
  expect(await waitForElement(() => screen.getByText(newRecipe.name))).toBeInTheDocument()
  


});




