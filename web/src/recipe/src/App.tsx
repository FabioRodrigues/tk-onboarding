import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import About from './pages/About/About'
import Index from './pages/Index/Index'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import RecipesList from './pages/RecipesList/RecipesList';


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/recipe-detail">Detail</Link>
          </li>
          <li>
          <Link to="/recipes">List</Link>
          </li>
        </ul>

        <hr />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/recipe-detail" component={RecipeDetail} />
            <Route path="/recipes" component={RecipesList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
