import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Movies from './containers/Movies/Movies';
import MovieDetails from './containers/MovieDetails/MovieDetails';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path = "/auth" component = { Auth }/>
            <Route path = "/logout" component = { Logout }/>
            <Route path = "/dashboard" component = { Movies }/>
            <Route path = "/film/:id" component = { MovieDetails }/>
            <Route path = "/" exact render = {() => (<Redirect to = "/dashboard"/>)}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
