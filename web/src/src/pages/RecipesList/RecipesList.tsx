import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { RespTable } from '../../styled/Table/Table'
import { StyledFlex } from '../../styled/Flex/Flex'
import { Link } from 'react-router-dom'
import { Button } from '../../styled/Button/Button'
import {ApiConfigs} from '../../config/ApiConfigs'

const Center = styled.div`
    text-align: center;
`

interface Teste{
    id: number,
    name: string,
    description: string

}

function RecipesList() {
    const [recipes, setRecipes] = useState(new Array<Teste>())
    useEffect(()=>{
        const fetchData = () => {
            axios.get(`${ApiConfigs.BaseUrl}/recipes`)
            .then((res)=> setRecipes(res.data))
            .catch((err)=>{
                alert('couldnt fetch recipes. See the console for details');
                console.log(err);
            });
        }
        fetchData();
    }, []);

    const actions = {
        deleteRecipe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
            e.preventDefault();
            axios.delete(`${ApiConfigs.BaseUrl}/recipes/${id}`)
            .then((res) => {
                setRecipes(recipes.filter((i)=> i.id !== id));
            })
            .catch((err) => {
                console.log(err);
            })
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
                    <RespTable.Body>
                        {recipes.map((item) => {
                            return (
                                <RespTable.Row>
                                    <RespTable.Column>
                                        <Link to={`/recipe-detail/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </RespTable.Column>
                                    <RespTable.Column>{item.description}</RespTable.Column>
                                    <RespTable.Column><Button.Delete onClick={(e) => actions.deleteRecipe(e, item.id)}>Delete</Button.Delete></RespTable.Column>
                                </RespTable.Row>
                            )
                        })}
                    </RespTable.Body>
                </RespTable.Table>
            </Center>
            <StyledFlex.Row>
                <StyledFlex.Item>
                    <Link to="/recipe-create">
                        <Button.Primary>
                            New
                        </Button.Primary>
                    </Link>
                </StyledFlex.Item>
            </StyledFlex.Row>
        </StyledFlex.Container>
    )

}

export default RecipesList;