import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserProfile from '../pages/UserProfile';
import UserProfileEdit from '../pages/UserProfileEdit';
import UserList from '../pages/UserList';

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
    const userProfileEdit = (params) => {
      return ( <UserProfileEdit {...this.props} match={params.match}/> );
    };
    const userList = (params) => {
      return ( <UserList {...this.props} match={params.match}/> );
    }; 
    return (
      <main>

        <Switch>
          <Route exact path='/' render={landing} />
          <Route exact path='/login' render={login} />
          <Route exact path='/signup' render={signup} />
        </Switch>

        <Switch>
          <Route path='/users/:userId/edit' render={userProfileEdit} />
          <Route path='/users/:userId' render={userProfile} />
          <Route exact path='/users' render={userList} />
        </Switch>

      </main>
    );
  }
}

export default Routes;