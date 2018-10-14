import React, { Component } from 'react';
import AlertCard from '../components/partials/AlertCard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    axios.get(`https://api.biohacking.services/users/${this.props.match.params.userId}`)
    .then(res => {
      console.log(res.data);
      let user = res.data.data;
      let createdDate = new Date(user.createdAt);
      user['createdFromNow'] = moment(createdDate).fromNow();
      this.setState({
        user
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
            {(this.props.isLoggedIn) ? (
              <div className="card">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">{this.state.user.username}</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {this.state.user.isAdmin && ( "Admin - " )}
                    joined {this.state.user.createdFromNow}
                  </p>
                </div>
                {(this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
                  <ul className="list-group list-group-flush">
                    <Link 
                      className="list-group-item list-group-item-action bg-primary text-light"
                      to={`/users/${this.state.user._id}/edit`}
                    >Edit</Link>                  
                  </ul>
                ) : null } 
              </div>
            ) : (
              <AlertCard 
                title="Login Required"
                message="You must be logged in to view this content."
              />
            )}


          </div>
        </div>

      </div>
    );
  }
}

export default UserProfilePage;
