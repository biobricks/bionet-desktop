import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';

class UserListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  getAllUsers() {
    axios.get(`https://api.biohacking.services/users`)
    .then(res => {
      console.log(res.data);
      this.setState({
        users: res.data.data
      });        
    })
    .catch(error => {
        console.error(error);        
    });    
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {

    const users = this.state.users.map((user, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/users/${user._id}`}
        >
          {user.username}
        </Link>
      )
    }); 

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Users</h4>
              </div>
              <ul className="list-group list-group-flush">
                {users}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default UserListPage;
