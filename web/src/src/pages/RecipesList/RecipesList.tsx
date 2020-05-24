import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RespTable, StyledFlex, Button } from '../../styled'
import { Link } from 'react-router-dom'
import { RecipeService } from '../../recipe-service/recipe-service'

const Center = styled.div`
    text-align: center;
`

interface Recipe {
    id: number,
    name: string,
    description: string

}

function RecipesList() {
    const [recipes, setRecipes] = useState(new Array<Recipe>())
    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipes = await RecipeService.list();
                setRecipes(recipes);
            }
            catch (err) {
                //just to simplify error treatment
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const deleteRecipe = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        try {
            if (await RecipeService.remove(id)) {
                setRecipes(recipes.filter((i) => i.id !== id));
            }
        } catch (err) {
            //just to simplify error treatment
            console.log(err);
        }
    }

    return (
        <StyledFlex.Container>
            <Center><h2>Recipes</h2></Center>
            <Center>
                <RespTable.Table>
                    <RespTable.Header>
                        <RespTable.Column>Name</RespTable.Column>
                        <RespTable.Column>Description</RespTable.Column>
                        <RespTable.Column></RespTable.Column>
                    </RespTable.Header>
                    <RespTable.Body id="teste">
                        {recipes.length > 0  ? recipes.map((item) => {
                            return (
                                <RespTable.Row key={item.id}>
                                    <RespTable.Column>
                                        <Link to={`/recipe-detail/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </RespTable.Column>
                                    <RespTable.Column>{item.description}</RespTable.Column>
                                    <RespTable.Column><Button.Delete onClick={(e) => deleteRecipe(e, item.id)}>Delete</Button.Delete></RespTable.Column>
                                </RespTable.Row>
                            )
                        }):<RespTable.Row>
                            <RespTable.Column data-testid="no-results">No recipes were found</RespTable.Column>
                            </RespTable.Row>}
                    </RespTable.Body>
                </RespTable.Table>
            </Center>
            <StyledFlex.Row>
                <StyledFlex.Item>
                    <Link to="/recipe-create">
                        <Button.Primary data-testid="new-button">
                            New
                        </Button.Primary>
                    </Link>
                </StyledFlex.Item>
            </StyledFlex.Row>
        </StyledFlex.Container>
    )

}

export default RecipesList;