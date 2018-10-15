import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';

import Grid from '../components/partials/Grid';

class LabProfile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      lab: {},
      form: {
        name: "",
        description: "",
        rows: 1, 
        columns: 1
      }
    };
    this.getLab = this.getLab.bind(this);
    this.updateField = this.updateField.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  getLab() {
    axios.get(`https://api.biohacking.services/labs/${this.props.match.params.labId}`)
    .then(res => {
      console.log("response", res.data);
      this.setState({
        lab: res.data.data
      });        
    })
    .catch(error => {
      console.error(error);        
    });    
  }

  updateField(e) {
    const field = e.target.name;
    let form = this.state.form;
    if(field === 'rows' || field === 'columns') {
      form[field] = Number(e.target.value);
    } else {
      form[field] = e.target.value;
    }
    this.setState({
      form
    });    
  }

  submitForm(formData) {
    if(formData.name.length > 0){
      let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`
        },
        'json': true
      };  
      axios.post('https://api.biohacking.services/labs/new', formData, config)
      .then(res => {     
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.error(error);
        this.setState({ form: formData });
      });      
    }  
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let form = this.state.form;
    this.setState({
      form: {
        name: "",
        description: "",
        rows: 1, 
        columns: 1            
      }
    });
    this.submitForm(form);
  }

  componentDidMount() {
    this.getLab();
  }  

  render() { 
    if (this.state.redirect === true) {
      return ( <Redirect to="/freezers"/> )
    }
    return (
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-12 col-md-7">
            { (this.props.isLoggedIn) ? (
              <div className="card mt-3">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">{this.state.lab.name}</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {this.state.lab.description}
                  </p>
                </div>
              </div>
            ) : null }  
          </div>

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