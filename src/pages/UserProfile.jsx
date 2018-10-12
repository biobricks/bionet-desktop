import React, { Component } from 'react';
import UserProfile from '../components/partials/UserProfile';

class UserProfilePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">{this.props.currentUser.username}</h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {this.props.currentUser.isAdmin && ( "Lab Admin - " )}
                  joined {this.props.currentUser.createdFromNow}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default UserProfilePage;
