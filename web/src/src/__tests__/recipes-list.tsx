import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, waitForElement, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App'
import { RecipeService } from '../recipe-service/recipe-service'

jest.mock('../recipe-service/recipe-service');

const data = [{
    id: 2,
    description: "desc",
    name: "pizza",
    ingredients: [{ name: "cheese" }]
}];

test('must not list recipes when no recipes was received from api', async () => {
    RecipeService.list.mockReturnValue([]);
    
    render(<App />)
    
    expect(await waitForElement(() => screen.queryByTestId('no-results'))).toBeInTheDocument()
});


test('must list recipes when recipes was received from api', async () => {
    
    RecipeService.list.mockReturnValue(data);

    render(<App />)

    expect(await waitForElement(() => screen.getByText('pizza'))).toBeInTheDocument()
});

test('must delete a recipe', async () => {
    const mockDelete = jest.fn().mockReturnValue(Promise.resolve(true))
    RecipeService.list.mockReturnValue(data);
    RecipeService.remove.mockImplementationOnce(mockDelete);

    render(<App />)
    expect(await waitForElement(() => screen.getByText('Delete'))).toBeInTheDocument()

    fireEvent.click(screen.getByText('Delete'))
    await waitForElementToBeRemoved(() => screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(data[0].id)
});

