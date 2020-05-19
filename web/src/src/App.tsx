import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import RecipesList from './pages/RecipesList/RecipesList'
import RecipeCreate from './pages/RecipeCreate/RecipeCreate'
import {StyledFlex } from './styled/Flex/Flex'


function App() {
  return (
    <Router>
      <div>
        <StyledFlex.Row>
          <StyledFlex.Item>
            <StyledFlex.Card>
            <Switch>
              <Route exact path="/" component={RecipesList} />
              <Route path="/recipe-detail/:id" component={RecipeDetail} />
              <Route path="/recipes" component={RecipesList} />
              <Route path="/recipe-create" component={RecipeCreate} />
            </Switch>
            </StyledFlex.Card>
          </StyledFlex.Item>
        </StyledFlex.Row>
      </div>
    </Router >
  );
}

export default App;
