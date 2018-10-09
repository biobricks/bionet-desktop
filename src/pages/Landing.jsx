import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-7 col-lg-5 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">BioNet</h4>
              </div>
              { this.props.isLoggedIn ? (
                <div className="card-body">
                  <p className="card-text">
                    Welcome {this.props.currentUser.username}!<br/>
                    What would you like to accomplish today?
                  </p>
                  <div className="btn-group-vertical" style={{'width': '100%'}}>
                    <Link to="/sequence" className="btn btn-block btn-primary">Sequence</Link>
                    <Link to="/build" className="btn btn-block btn-info">Build</Link>
                    <Link to="/transform" className="btn btn-block btn-success">Transform</Link>
                  </div>
                </div>
              ) : (
                <div className="card-body">
                  <p className="card-text">
                    Welcome to BioNet! Please <Link to="/login">Login</Link> to continue.
                  </p>
                </div>                
              )}  

              { !this.props.isLoggedIn ? (
                <ul className="list-group list-group-flush">
                  <Link 
                    className="list-group-item list-group-item-action bg-success text-light"
                    to="/login"
                  >Login</Link>
                  <Link 
                    className="list-group-item list-group-item-action bg-primary text-light"
                    to="/signup"
                  >Sign Up</Link>
                </ul>
              ) : null }

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
