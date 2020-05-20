import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { StyledFlex } from '../../styled/Flex/Flex'
import { Button } from '../../styled/Button/Button'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
    outline: none;
    font-size: 14px;
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
    font-size: 14px;
    text-decoration: underline;
`

const IngredientItem = styled(StyledFlex.Item)`
    width: 45%;
`

const LinkButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: gray;
    outline: none;
`

interface RecipePayload {
    id: number,
    name: string,
    description: string,
    ingredients: RecipePayloadIngredient[]
}

interface RecipePayloadIngredient {
    name: string
}

interface Response {
    data: RecipePayload
}

function RecipeCreate(req: any) {
    const id = req.match.params.id;

    const [isEdit, setIsEdit] = useState(id !== null && id !== undefined)
    const [recipeId, setRecipeId] = useState(id)
    const [editEnabled, setEditEnabled] = useState(false)


    const [recipeName, setrecipeName] = useState("")
    const [recipeDescription, setrecipeDescription] = useState("")

    const [ingredients, setIngredients] = useState(new Array<string>())
    const [ingredientName, setIngredientName] = useState("")
    const history = useHistory()

    useEffect(() => {
        const fetchRecipe = () => {
            axios.get(`http://localhost:8000/recipes/${id}`)
                .then((res: Response) => {
                    console.log(res)
                    setrecipeName(res.data.name);
                    setrecipeDescription(res.data.description);
                    setIngredients(res.data.ingredients.map((item) => item.name));
                })
                .catch((err) => console.log(err));
        };
        if (isEdit) fetchRecipe();
    }, [])

    const actions = {
        addIngredient: () => {
            if (ingredientName === "") return;

            setIngredients([...ingredients, ingredientName]);
            setIngredientName("");
        },
        submit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let payload = {
                name: recipeName,
                description: recipeDescription,
                ingredients: ingredients.filter((i) => i !== "").map((i) => { return { name: i } })
            }

            if (isEdit) {
                actions.edit(payload);
                return;
            }

            actions.create(payload);
        },
        create: (payload: any) => {
            axios.post('http://localhost:8000/recipes', payload)
                .then((resp) => {
                    console.log(resp);
                    history.goBack()
                }).catch((err) => {
                    console.log(err);
                });
        },
        edit: (payload: any) => {
            axios.patch(`http://localhost:8000/recipes/${recipeId}`, payload)
                .then((resp) => {
                    console.log(resp);
                    history.goBack()
                }).catch((err) => {
                    console.log(err);
                })
        },
        toggleEditable: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setEditEnabled(!editEnabled);
        },        
        keyDownIngredient: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                actions.addIngredient();
                return false;
            }
        },
        deleteIngredient: (index: any) => {
            setIngredients(ingredients.filter((_, i) =>  i !== index))
        }
    }

    return (
        <StyledFlex.Container>
            <form onSubmit={actions.submit}>
                <StyledFlex.Row>

                    {
                        (!isEdit)
                            ? <h2> New recipe </h2>
                            :   (<div>
                                        <h2>Recipe
                                            {
                                                (!editEnabled)
                                                ? <LinkButton onClick={actions.toggleEditable}>( edit )</LinkButton >
                                                : <LinkButton onClick={actions.toggleEditable}>( lock )</LinkButton > 
                                            }
                                            </h2>
                                        
                                </div>)
                    }
                </StyledFlex.Row>
                <Divider />
                <StyledFlex.Row>
                    <StyledFlex.Item>
                        <div>
                            <FormLabel htmlFor="name">
                                Name:
                            </FormLabel>
                            <TextBox type="text" id="name" value={recipeName} placeholder="Recipe name" readOnly={isEdit && !editEnabled} required onChange={(e) => setrecipeName(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                    <StyledFlex.Item>
                        <div>
                            <FormLabel htmlFor="description">
                                Description:
                            </FormLabel>
                            <TextBox type="text" id="description" value={recipeDescription} placeholder="Recipe description" readOnly={isEdit && !editEnabled} required onChange={(e) => setrecipeDescription(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                </StyledFlex.Row>
                {
                    (!isEdit || editEnabled) &&
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
                }


                <StyledFlex.Row>
                    <StyledFlex.Item>
                        <ContainerIngredients >
                            <StyledFlex.Row>
                                <StyledFlex.Item>
                                    <List>
                                        {ingredients.map((item, index) => (
                                            <ListItem>- {item} {(!isEdit || editEnabled)&&
                                                <LinkButton onClick={() => actions.deleteIngredient(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </LinkButton>
                                            }
                                            </ListItem>
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
                        {
                            (!isEdit || editEnabled)&&
                                <Button.Primary type="submit" >Save</Button.Primary>
                        }
                    </StyledFlex.Item>
                </StyledFlex.Row>
            </form>
        </StyledFlex.Container >
    )
}

export default RecipeCreate;