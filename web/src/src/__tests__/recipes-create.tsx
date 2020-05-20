import '@testing-library/jest-dom'
import axios from 'axios'
import React from 'react'
import { fireEvent, screen, waitForElement, render, cleanup } from '@testing-library/react'
import App from '../App'

const recipe = {
  name: "pizza",
  id: 1,
  description: "desc",
  ingredients: [{ name: "cheese" }]
}

const originalError = console.error
beforeAll(() => {
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

test('must add ingredients', async () => {
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [recipe] }))
  jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: {} }))
  render(<App />)
  let newRecipe = recipe;
  newRecipe.name="kebab";
  newRecipe.description="turkish";
  await fireEvent.click(screen.queryByTestId("new-button"));
  screen.debug(document.body)
  await fireEvent.change(screen.getByTestId("name"), {target:{value:newRecipe.name}})
  await fireEvent.change(screen.getByTestId("description"), {target:{value:newRecipe.description}})
  await fireEvent.click(screen.getByTestId("save-button"))
  
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [newRecipe] }))

  expect(await waitForElement(() => screen.queryByText(newRecipe.name))).toBeInTheDocument()
});