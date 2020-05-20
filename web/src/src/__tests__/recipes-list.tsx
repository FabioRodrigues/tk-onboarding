import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import { render, fireEvent, screen, waitForElement, waitForElementToBeRemoved } from '@testing-library/react'
import RecipesList from '../pages/RecipesList/RecipesList'
import App from '../App'
import { act } from 'react-dom/test-utils'


const originalError = console.error
beforeAll(() => {
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


test('must not list recipes when no recipes was received from api', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });


    act(() => {
        jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: [] }))
        render(<App />)
    })

    expect(screen.queryByText('pizza')).toBe(null);
});


test('must list recipes when recipes was received from api', async () => {
    const data = [{
        id: 2,
        description: "desc",
        name: "pizza",
        ingredients: [{name:"cheese"}]
    }];

    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: data }))

    render(<App />)

    expect(await waitForElement(() => screen.getByText('pizza'))).toBeInTheDocument()
});

test('must delete a recipe', async () => {
    const data = [{
        id: 1,
        name: "pizza",
        description: "Italian food"
    }];

    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: data }))
    jest.spyOn(axios, 'delete').mockImplementationOnce(() => Promise.resolve({ data: {} }))

    render(<App />)
    expect(await waitForElement(() => screen.getByText('Delete'))).toBeInTheDocument()

    fireEvent.click(screen.getByText('Delete'))
    await waitForElementToBeRemoved(() => screen.getByText('Delete'))
});

