import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { StyledFlex } from '../../styled/Flex/Flex'
import { Button } from '../../styled/Button/Button'
import styled from 'styled-components'
const ContainerIngredients = styled.div`
    border: none;
    width: 30vw;
    height: 20vh;
    max-height: 25vh;
    overflow: scroll;
    text-align: left;
`

const TextBox = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;    
`
const Divider = styled.hr`
    width: 70%;
    border: 0.5px solid #e2e2e2;
`
const FormLabel = styled.label`
    font-size: 10px;
`
const List = styled.ul`
    padding: 0;
    width: 100%;
`

const ListItem = styled.li`
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 11px;
    text-decoration: underline;
`

const IngredientItem = styled(StyledFlex.Item)`
    width: 45%;
`

function RecipeCreate() {

    const [recipeName, setrecipeName] = useState("")
    const [recipeDescription, setrecipeDescription] = useState("")

    const [ingredients, setIngredients] = useState(new Array<string>())
    const [ingredientName, setIngredientName] = useState("")
    const history = useHistory()

    const actions = {
        addIngredient: () => {
            if (ingredientName === "") return;

            setIngredients([...ingredients, ingredientName]);
            setIngredientName("");
        },
        save: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let payload = {
                name: recipeName,
                description: recipeDescription,
                ingredients: ingredients.filter((i) => i !== "").map((i) => { return { name: i } })
            }
            axios.post('http://localhost:8000/recipes', payload)
                .then((resp) => {
                    console.log(resp);
                    history.goBack()
                }).catch((err) => {
                    console.log(err);
                })
        },
        keyDownIngredient: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter"){
                e.preventDefault();
                debugger;
                actions.addIngredient();
                return false;
            }
        }
    }

    return (
        <StyledFlex.Container>
            <form onSubmit={actions.save}>
                <StyledFlex.Row>
                    <h2>New recipe</h2>
                </StyledFlex.Row>
                <Divider />
                <StyledFlex.Row>
                    <StyledFlex.Item>
                        <div>
                            <FormLabel htmlFor="name">
                                Name:
                            </FormLabel>
                            <TextBox type="text" id="name" placeholder="Recipe name" required onChange={(e) => setrecipeName(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                    <StyledFlex.Item>
                        <div>
                            <FormLabel htmlFor="description">
                                Description:
                            </FormLabel>
                            <TextBox type="text" id="description" placeholder="Recipe description" required onChange={(e) => setrecipeDescription(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                </StyledFlex.Row>
                {/* <StyledFlex.Row>
                    <label>Ingredients</label>
                </StyledFlex.Row> */}
                {/* <DividerIngredients /> */}
                <StyledFlex.Row>
                    <IngredientItem>
                            <FormLabel>
                                Name:
                                <TextBox type="text" name="name" value={ingredientName} 
                                onKeyDown={actions.keyDownIngredient}
                                onChange={(e) => setIngredientName(e.target.value)} placeholder="Ingredient name ( type <ENTER> to add )" />
                            </FormLabel>
                    </IngredientItem>
                </StyledFlex.Row>
                <StyledFlex.Row>
                    <StyledFlex.Item>
                        <ContainerIngredients >
                            <StyledFlex.Row>
                                <StyledFlex.Item>
                                    <List>
                                    {ingredients.map((item) => (
                                        <ListItem>- {item}</ListItem>
                                    ))
                                    }
                                    </List>
                                </StyledFlex.Item>
                            </StyledFlex.Row>
                        </ContainerIngredients>
                    </StyledFlex.Item>
                </StyledFlex.Row>
                <StyledFlex.Row>
                    <StyledFlex.Item>
                        <Link to="/recipes">
                            <Button.Secondary>Back</Button.Secondary>
                        </Link>
                        <Button.Primary>Save</Button.Primary>
                    </StyledFlex.Item>
                </StyledFlex.Row>
            </form>
        </StyledFlex.Container >
    )
}

export default RecipeCreate;