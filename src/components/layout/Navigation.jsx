import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {

  render() {
   
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">BioNet</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#primaryNavigation" aria-controls="primaryNavigation" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="primaryNavigation">
          <ul className="navbar-nav mr-auto"> 
            
            { (this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <h5 className="dropdown-header">List</h5>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/users">Users</Link>
                  <Link className="dropdown-item" to="/freezers">Freezers</Link>
                  <div className="dropdown-divider"></div>
                  <h5 className="dropdown-header">In Development</h5>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/csvform">Bulk Upload</Link>
                </div>
              </li>
            ) : null }

            { this.props.isLoggedIn ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.props.currentUser.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <h5 className="dropdown-header">User Menu</h5>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to={`/users/${this.props.currentUser._id}`}>Profile</Link>
                </div>
              </li>
            ) : null }

            { this.props.isLoggedIn ? (
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="/"
                  onClick={ this.props.logoutCurrentUser }
                >Logout</a>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link" href="#">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;