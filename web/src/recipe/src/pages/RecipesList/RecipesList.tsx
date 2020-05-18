import React, { createContext, useContext } from 'react'
import styled from 'styled-components'

const Row = styled.div`
    width: 100%;
    border: 2px solid;
`
const Table = styled.div`
    display: table;
    width: 100%;
`

const TableHeader = styled.div`
    display: table-header-group;
`

const TableBody = styled.div`
    display: table-row-group;
`

const TableRow = styled.div`
    display: table-row;
    `

const TableColumn = styled.div`
    display: table-cell;
`

const recipesModel = [
    {"name": "Pizza", "description":"Italian food"},
    {"name": "Kebab", "description":"Turkish food"},
]
const recipesContext = createContext(recipesModel)

function RecipesList(){
    const recipes = useContext(recipesContext)
return (
    <div>
        <Table>
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
            </TableHeader>
            <TableBody>
                {recipes.map((item)=> {
                    return (
                        <TableRow>
                            <TableColumn>{item.name}</TableColumn>
                            <TableColumn>{item.description}</TableColumn>
                        </TableRow>
                    )
                })}
            </TableBody>

        </Table>
    </div>        
    )
    
}

export default RecipesList;