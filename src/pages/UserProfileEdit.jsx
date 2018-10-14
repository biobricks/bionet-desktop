import React, { Component } from 'react';
import Auth from '../modules/Auth';
import AlertCard from '../components/partials/AlertCard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

class UserProfileEditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      form: {
        username: "",
        email: "",
        name: "",
        isAdmin: false,
        imageUrl: ""
      }
    };
    this.getUser = this.getUser.bind(this);
    this.onFormInput = this.onFormInput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleIsAdmin = this.toggleIsAdmin.bind(this);
  }

  getUser() {
    axios.get(`https://api.biohacking.services/users/${this.props.match.params.userId}`)
    .then(res => {
      console.log(res.data);
      let user = res.data.data;
      let form = res.data.data;
      let createdDate = new Date(user.createdAt);
      user['createdFromNow'] = moment(createdDate).fromNow();
      this.setState({
        user,
        form
      });        
    })
    .catch(error => {
      console.error(error);        
    });    
  }

  onFormInput(e) {
    const field = e.target.name;
    const form = this.state.form;
    form[field] = e.target.value;
    this.setState({
      form
    });    
  }

  onFormSubmit(e) {
    e.preventDefault();
    let form = this.state.form;
    this.setState({
      form: {
        username: "",
        email: "",
        name: "",
        isAdmin: false,
        imageUrl: ""
      }
    });
    this.handleFormSubmit(form);
  }

  handleFormSubmit(form) {
    let config = {
      'headers': {
        'authorization': `Bearer ${Auth.getToken()}`,
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
      'json': true
    };  
    axios.post(`https://api.biohacking.services/users/${this.props.match.params.userId}/edit`, form, config)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  toggleIsAdmin() {
    let form = this.state.form;
    form.isAdmin = !this.state.form.isAdmin;
    this.setState({
      form
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
                  <h4 className="card-title mb-0">Edit {this.state.user.username}</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                        name="name"
                        type="text"
                        className="form-control"
                        value={this.state.form.name}
                        onChange={this.onFormInput}
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        name="email"
                        type="text"
                        className="form-control"
                        value={this.state.form.email}
                        onChange={this.onFormInput}
                        placeholder="youremailaddress@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Username</label>
                      <input 
                        name="username"
                        type="text" 
                        className="form-control"
                        value={this.state.form.username}
                        onChange={this.onFormInput}
                        placeholder="username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="imageUrl">Profile Image URL</label>
                      <input 
                        name="imageUrl"
                        type="text" 
                        className="form-control"
                        value={this.state.form.imageUrl}
                        onChange={this.onFormInput}
                        placeholder="http://anywebsite.com/theImageIwantAsAProfileImage.png"
                      />
                    </div>
                    <div className="form-check">
                      <input 
                        name="isAdmin"
                        type="checkbox" 
                        className="form-check-input" 
                        value={this.state.form.isAdmin} 
                        checked={this.state.form.isAdmin}
                        onChange={this.toggleIsAdmin}
                      />
                      <label className="form-check-label" htmlFor="isAdmin">
                        Has Administrator Access
                      </label>
                    </div>                                                           
                    <div className="form-group">
                      <button type="submit" className="btn btn-success mt-3">Save</button>
                    </div>
                  </form>
                </div>
                <ul className="list-group list-group-flush">
                  <Link 
                    className="list-group-item list-group-item-action bg-secondary text-light"
                    to={`/users/${this.state.user._id}`}
                  >Cancel</Link>                  
                </ul>
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

export default UserProfileEditPage;
