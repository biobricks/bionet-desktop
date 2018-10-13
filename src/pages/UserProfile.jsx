import React, { Component } from 'react';
//import UserProfile from '../components/partials/UserProfile';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    axios.get(`https://api.biohacking.services/users/${this.props.match.params.userId}`)
    .then(res => {
      console.log(res.data);
      this.setState({
        user: res.data.data
      });        
    })
    .catch(error => {
        console.error(error);        
    });    
  }

  componentDidMount() {
    this.getUser();
  }  

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
                {(this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
                  <Link to={'/edit'}>Edit</Link>
                ) : null }
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default UserProfilePage;
