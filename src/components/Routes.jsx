import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

class Routes extends Component {
  render() {
    const landing = () => {
      return ( <Landing {...this.props} /> );
    };
    const login = () => {
      return ( <Login {...this.props} /> );
    };
    const signup = () => {
      return ( <Signup {...this.props} /> );
    };    
    return (
      <main>

        <Switch>
          <Route exact path='/' render={landing} />
          <Route exact path='/login' render={login} />
          <Route exact path='/signup' render={signup} />
        </Switch>

      </main>
    );
  }
}

export default Routes;