import React, {createContext, useContext} from 'react'
import { Link } from 'react-router-dom';

const modelList = {
    name: "Margherita Pizza",
    description: "A tipical Italian food",
    ingredients: [
        { name: "sliced tomatoes" },
        { name: "cheese" }
    ]
}

const modelContext = createContext(modelList)

// const list = model.ingredients.map((item) =>
//     <p>item.name</p>
// );


function RecipeDetail() {

    const model = useContext(modelContext)
    
    return (
        <div>
            <div>{model.name}</div>
            <div>{model.description}</div>
            {model.ingredients.map((item)=>{
                return (<p>{item.name}</p>)
            })}
            <div>
                <Link to="/">Back</Link>
            </div>
        </div>
    )

}

export default RecipeDetail;