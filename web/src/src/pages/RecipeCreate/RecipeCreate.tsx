import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { StyledFlex, Button } from '../../styled'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { RecipeService } from '../../recipe-service/recipe-service'

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

function RecipeCreate(req: any) {
    const id = req.match.params.id;

    const [isEdit] = useState(id !== null && id !== undefined)
    const [recipeId] = useState(id)
    const [editEnabled, setEditEnabled] = useState(false)


    const [recipeName, setrecipeName] = useState("")
    const [recipeDescription, setrecipeDescription] = useState("")

    const [ingredients, setIngredients] = useState(new Array<string>())
    const [ingredientName, setIngredientName] = useState("")
    const history = useHistory()

    useEffect(() => {
        if(isEdit) fetchRecipe(id, isEdit);
    }, []);

    const fetchRecipe = async (id: number, isEdit: boolean) => {
        try {
            if(!isEdit) return;

            const recipe = await RecipeService.get(id);
            if (recipe) {
                setrecipeName(recipe.name);
                setrecipeDescription(recipe.description);
                setIngredients(recipe.ingredients.map((item) => item.name));
                
            }
        } catch (err) {
            //just to simplify error treatment
            console.log(err);
        }

    }

    const addIngredient = () => {
        if (ingredientName === "") return;

        setIngredients([...ingredients, ingredientName]);
        setIngredientName("");
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload = {
            name: recipeName,
            description: recipeDescription,
            ingredients: ingredients.map((i) => { return { name: i } })
        }

        try {

            if (isEdit) {
                edit(recipeId, payload);
                return;
            }

            create(payload);
        } catch (err) {
            //just to simplify error treatment
            console.log(err);
        }
    }
    
    const create = async (payload: any) => {
        let result = await RecipeService.save(payload)
        if (result) history.push('/');
    }

    const edit = async (recipeId: any, payload: any) => {
        let result = await RecipeService.update(recipeId, payload)
        if (result) history.push('/');
    }


    const toggleEditable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setEditEnabled(!editEnabled);
    }

    const keyDownIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addIngredient();
            return false;
        }
    }

    const deleteIngredient = (index: any) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }


    return (
        <StyledFlex.Container>
            <form onSubmit={submit}>
                <StyledFlex.Row>

                    {
                        (!isEdit)
                            ? <h2> New recipe </h2>
                            : (<div>
                                <h2>Recipe
                                            {
                                        (!editEnabled)
                                            ? <LinkButton onClick={toggleEditable} data-testid="edit">( edit )</LinkButton >
                                            : <LinkButton onClick={toggleEditable} data-testid="lock">( lock )</LinkButton >
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
                            <TextBox data-testid="name" type="text" id="name" value={recipeName} placeholder="Recipe name" readOnly={isEdit && !editEnabled} required onChange={(e) => setrecipeName(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                    <StyledFlex.Item>
                        <div>
                            <FormLabel htmlFor="description">
                                Description:
                            </FormLabel>
                            <TextBox data-testid="description" type="text" id="description" value={recipeDescription} placeholder="Recipe description" readOnly={isEdit && !editEnabled} required onChange={(e) => setrecipeDescription(e.target.value)} />
                        </div>
                    </StyledFlex.Item>
                </StyledFlex.Row>
                {
                    (!isEdit || editEnabled) &&
                    <StyledFlex.Row>
                        <IngredientItem>
                            <FormLabel>
                                Name:
                                        <TextBox 
                                        type="text" 
                                        name="name"
                                        data-testid='ingredient-add'
                                        value={ingredientName}
                                        onKeyDown={keyDownIngredient}
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
                                            <ListItem key={index}>- {item} {(!isEdit || editEnabled) &&
                                                <LinkButton data-testid={`remove-ingredient-${index}`} onClick={() => deleteIngredient(index)}>
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
                        <Link to="/">
                            <Button.Secondary>Back</Button.Secondary>
                        </Link>
                        {
                            (!isEdit || editEnabled) &&
                            <Button.Primary data-testid="save-button" type="submit" >Save</Button.Primary>
                        }
                    </StyledFlex.Item>
                </StyledFlex.Row>
            </form>
        </StyledFlex.Container >
    )
}

export default RecipeCreate;