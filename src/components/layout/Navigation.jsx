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
                  <Link to="/worlds" className="dropdown-item">Worlds</Link>
                  <Link to="/freezers" className="dropdown-item">Freezers</Link>
                  <Link to="/plates" className="dropdown-item">Plates</Link>
                  <Link to="/wells" className="dropdown-item">Wells</Link>
                  <Link to="/dna-samples" className="dropdown-item">DNA Samples</Link>
                  <Link to="/organism-samples" className="dropdown-item">Organism Samples</Link>
                  <Link to="/samples" className="dropdown-item">Samples</Link>
                  <div className="dropdown-divider"></div>
                  <h5 className="dropdown-header">New</h5>
                  <div className="dropdown-divider"></div>
                  <Link to="/worlds/new" className="dropdown-item">World</Link>
                  <Link to="/freezers/new" className="dropdown-item">Freezer</Link>
                  <Link to="/plates/new" className="dropdown-item">Plate</Link>
                  <Link to="/wells/new" className="dropdown-item">Well</Link>
                  <Link to="/dna-samples/new" className="dropdown-item">DNA Sample</Link>
                  <Link to="/organism-samples/new" className="dropdown-item">Organism Sample</Link>
                  <Link to="/samples/new" className="dropdown-item">Sample</Link>
                </div>
              </li>
            ) : null }

            { this.props.isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
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