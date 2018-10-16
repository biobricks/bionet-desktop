import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';
import AlertCard from '../components/partials/AlertCard';
import Grid from '../components/partials/Grid';

class LabProfile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      lab: {},
      containers: [],
      form: {
        name: "",
        description: "",
        rows: 1, 
        columns: 1
      }
    };
    this.getLab = this.getLab.bind(this);
  }

  getLab() {
    axios.get(`https://api.biohacking.services/labs/${this.props.match.params.labId}`)
    .then(res => {
      console.log("response", res.data);
      this.setState({
        lab: res.data.data,
        containers: res.data.children
      });        
    })
    .catch(error => {
      console.error(error);        
    });    
  }

  componentDidMount() {
    this.getLab();
  }  

  render() { 
    let users = this.state.lab.users || [];
    const members = users.map((user, index) => {
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

    const containers = this.state.containers.map((container, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/containers/${container._id}`}
        >
          {container.name}
        </Link>
      )
    }); 

    return (
      <div className="container-fluid">
        <div className="row">  
          { (this.props.isLoggedIn) ? (
            <div className="col-12 col-md-7">

              <div className="card mt-3">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">
                    <i className="mdi mdi-teach mr-2" />
                    {this.state.lab.name}
                    <small className="float-right btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                      <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" className="btn btn-sm btn-primary">
                          <i className="mdi mdi-playlist-edit mr-1" />
                          Edit
                        </button>
                        <button type="button" className="btn btn-sm btn-success">
                          <i className="mdi mdi-plus-box mr-1" />
                          Add
                        </button>
                        <button type="button" className="btn btn-sm btn-danger">
                          <i className="mdi mdi-minus-box mr-1" />
                          Remove
                        </button>
                      </div>  
                    </small>
                  </h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {this.state.lab.description}
                  </p>
                </div>
              </div>
              
              {(containers.length > 0) ? (
                <div className="card mt-3">
                  <div className="card-header bg-dark text-light">
                    <h4 className="card-title mb-0">
                      <i className="mdi mdi-teach mr-2" />
                      Containers
                    </h4>                      
                  </div>
                  <ul className="list-group list-group-flush">
                    {containers}
                  </ul>                  
                </div>
              ) : null }

              {(members.length > 0) ? (
                <div className="card mt-3">
                  <div className="card-header bg-dark text-light">
                    <h5 className="card-title mb-0">
                      <i className="mdi mdi-account-multiple mr-2" />
                      Members
                    </h5>                      
                  </div>
                  <ul className="list-group list-group-flush">
                    {members}
                  </ul>                  
                </div>
              ) : null }

            </div>
          ) : (
            <div className="col-12 col-md-7">
              <AlertCard 
                title="Login Required"
                message="You must be logged in to view this content."
              />
            </div>
          ) }  
          

          <div className="col-12 col-md-5">
            {(Object.keys(this.state.lab).length > 0) ? (
              <Grid 
                demo={false}
                recordType="Container"
                record={this.state.lab}
              />
            ) : null }
          </div>
          
        </div>
      </div>
    );
  }
}

export default LabProfile;