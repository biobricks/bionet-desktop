import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserProfile from '../pages/UserProfile';

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
    const userProfile = (params) => {
      return ( <UserProfile {...this.props} match={params.match}/> );
    }; 
    return (
      <main>

        <Switch>
          <Route exact path='/' render={landing} />
          <Route exact path='/login' render={login} />
          <Route exact path='/signup' render={signup} />
        </Switch>

        <Switch>
          <Route exact path='/users/:userId' render={userProfile} />
        </Switch>

      </main>
    );
  }
}

export default Routes;