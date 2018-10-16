import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserProfile from "../pages/UserProfile";
import UserProfileEdit from "../pages/UserProfileEdit";
import UserList from "../pages/UserList";
import Cvsform from "../pages/Cvsform";

import ContainerTutorial from '../pages/ContainerTutorial';

import FreezerTutorial from '../pages/FreezerTutorial';
import FreezerNew from '../pages/FreezerNew';
import FreezerList from '../pages/FreezerList';

import LabConfigure from '../pages/LabConfigure';
import LabJoin from '../pages/LabJoin';
import LabProfile from '../pages/LabProfile';
import LabEdit from '../pages/LabEdit';

class Routes extends Component {
  render() {
    
    const landing = () => {
      return <Landing {...this.props} />;
    };
    
    const login = () => {
      return <Login {...this.props} />;
    };
    const signup = () => {
      return <Signup {...this.props} />;
    };

    const userProfile = params => {
      return <UserProfile {...this.props} match={params.match} />;
    };
    const userProfileEdit = params => {
      return <UserProfileEdit {...this.props} match={params.match} />;
    };
    const userList = (params) => {
      return ( <UserList {...this.props} match={params.match}/> );
    };

    const csvform = () => {
      return <Cvsform {...this.props} />;
    };      
      
    const labConfigure = () => {
      return ( <LabConfigure {...this.props}/> );
    };
    const labJoin = () => {
      return ( <LabJoin {...this.props}/> );
    }; 
    const labProfile = (params) => {
      return ( <LabProfile {...this.props} match={params.match}/> );
    };
    const labEdit = (params) => {
      return ( <LabEdit {...this.props} match={params.match}/> );
    }; 

    const containerTutorial = (params) => {
      return ( <ContainerTutorial {...this.props} match={params.match}/> );
    };

    const freezerTutorial = () => {
      return ( <FreezerTutorial {...this.props}/> );
    };
    const freezerNew = () => {
      return ( <FreezerNew {...this.props}/> );
    };
    const freezerList = (params) => {
      return ( <FreezerList {...this.props} match={params.match}/> );
    };
    
    return (
      <main>
        <Switch>
          <Route exact path="/" render={landing} />
          <Route exact path="/login" render={login} />
          <Route exact path="/signup" render={signup} />
          <Route exact path="/csvform" render={csvform} />
        </Switch>

        <Switch>
          <Route path="/users/:userId/edit" render={userProfileEdit} />
          <Route path="/users/:userId" render={userProfile} />
          <Route exact path="/users" render={userList} />
        </Switch>
        
        <Switch>
          <Route exact path='/freezers/new' render={freezerNew} />
          <Route exact path='/freezers' render={freezerList} />
        </Switch>

        <Switch>
          <Route path="/labs/:labId/edit" render={labEdit} />
          <Route exact path='/labs/configure' render={labConfigure} />
          <Route exact path='/labs/join' render={labJoin} />
          <Route path="/labs/:labId" render={labProfile} />
        </Switch>        
        
        <Switch>
          <Route exact path='/tutorials/:labId/container' render={containerTutorial} />
          <Route exact path='/tutorials/freezer' render={freezerTutorial} />
        </Switch> 

      </main>
    );
  }
}

export default Routes;
