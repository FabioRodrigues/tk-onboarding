import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import RecipesList from './pages/RecipesList/RecipesList'
import RecipeCreate from './pages/RecipeCreate/RecipeCreate'
import styled from 'styled-components'

const Card = styled.div`
    border-radius: 5px;
    width: 50vw;
    min-height: 60vh;
    min-width: 80vw;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin-top: 50px;
    padding:10px 0;    
`

const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`

function App() {
  return (
    <Router>
      <Container>
            <Card>
            <Switch>
              <Route exact path="/" component={RecipesList} />
              <Route path="/recipe-detail/:id" component={RecipeCreate} />
              <Route path="/recipe-create" component={RecipeCreate} />
            </Switch>
            </Card>
      </Container>
    </Router >
  );
}

export default App;
