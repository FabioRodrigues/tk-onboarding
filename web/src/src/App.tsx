import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import RecipesList from './pages/RecipesList/RecipesList'
import RecipeCreate from './pages/RecipeCreate/RecipeCreate'
import {StyledFlex } from './styled/Flex/Flex'

import styled from 'styled-components'

const CardMain = styled(StyledFlex.Card)`
  margin-top: 50px;
  padding:10px 0;
`

function App() {
  return (
    <Router>
        <StyledFlex.Row>
          <StyledFlex.Item>
            <CardMain>
            <Switch>
              <Route exact path="/" component={RecipesList} />
              <Route path="/recipe-detail/:id" component={RecipeCreate} />
              <Route path="/recipe-create" component={RecipeCreate} />
            </Switch>
            </CardMain>
          </StyledFlex.Item>
        </StyledFlex.Row>
    </Router >
  );
}

export default App;
