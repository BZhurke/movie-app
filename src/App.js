import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Movies from './containers/Movies/Movies';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path = "/auth" component = { Auth }/>
            <Route path = "/logout" component = { Logout }/>
            <Route path = "/" exact component = { Movies }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
