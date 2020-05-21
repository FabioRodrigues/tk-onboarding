import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, waitForElement, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App'
import { act } from 'react-dom/test-utils'
import {RecipeService} from '../recipe-service/recipe-service'

const data = [{
    id: 2,
    description: "desc",
    name: "pizza",
    ingredients: [{name:"cheese"}]
}];

test('must not list recipes when no recipes was received from api', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    
        jest.spyOn(RecipeService, 'list').mockImplementationOnce(() => Promise.resolve([]))
        await act(async () => {render(<App />)}) 

    expect(screen.queryByText('pizza')).toBe(null);
});


test('must list recipes when recipes was received from api', async () => {

    jest.spyOn(RecipeService, 'list').mockImplementation(() => Promise.resolve(data))

    await act(async () => {render(<App />)}) 

    expect(await waitForElement(() => screen.getByText('pizza'))).toBeInTheDocument()
});

test('must delete a recipe', async () => {
    const data = [{
        id: 1,
        name: "pizza",
        description: "Italian food",
        ingredients: []
    }];
    const mockDelete = jest.fn().mockReturnValue(Promise.resolve(true))

    jest.spyOn(RecipeService, 'list').mockImplementationOnce(() => Promise.resolve(data))
    jest.spyOn(RecipeService, 'remove').mockImplementationOnce(mockDelete)

    await act(async () => {render(<App />)}) 
    expect(await waitForElement(() => screen.getByText('Delete'))).toBeInTheDocument()

    fireEvent.click(screen.getByText('Delete'))
    await waitForElementToBeRemoved(() => screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(data[0].id)
});

