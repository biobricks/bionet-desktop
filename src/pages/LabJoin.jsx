import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import shortid from 'shortid';

import Grid from '../components/partials/Grid';

class LabJoin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      labsJoined: [],
      labs: [],
      lab: {},
      form: {
        name: "",
        description: "",
        rows: 1, 
        columns: 1
      }
    };
    this.getAllLabs = this.getAllLabs.bind(this);
    this.updateField = this.updateField.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  getAllLabs() {
    axios.get(`https://api.biohacking.services/labs`)
    .then(res => {
      console.log("response", res.data);
      let labArray = res.data.data;
      let labsJoined = [];
      let labs = [];
      for(let i = 0; i < labArray.length; i++){
        let lab = labArray[i];
        let userId = this.props.currentUser._id;
        let userExistsInLab = false;
        for(let j = 0; j < lab.users.length; j++){
          let labUserId = lab.users[j]._id;
          if (labUserId === userId){
            userExistsInLab = true;
          }
        }
        if (!userExistsInLab) {
          labs.push(lab);
        } else {
          labsJoined.push(lab)
        }
      }
      this.setState({
        labs,
        labsJoined
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
        this.setState({ 
          lab: res.data.data,
          redirect: true 
        });
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

  render() { 
    const labs = this.state.labs.map((lab, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/labs/${lab._id}`}
        >
          {lab.name} - {lab.users.length} Members
        </Link>
      )
    });
    const labsJoined = this.state.labsJoined.map((lab, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/labs/${lab._id}`}
        >
          {lab.name} - {lab.users.length} Members
        </Link>
      )
    });
    return (
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-12 col-md-7">
            { (this.props.isLoggedIn) ? (
              <div className="card mt-3">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">Join Lab</h4>
                </div>
                <div className="card-body">
                  {(this.state.labs.length > 0) ? (
                    <p className="card-text">
                      Which Lab are you requesting access to?
                    </p>
                  ) : (
                    <p className="card-text">
                      There are currently no new Labs listed to for you to join.<br/>
                      <Link to="/labs/configure">Configure A New Lab</Link><br/>
                      { this.state.labsJoined.length > 0 ? (
                        <span>or select a lab from the list below.</span>
                      ) : null }
                    </p>
                  )}
                </div>
                {(this.state.labs.length > 0) ? (
                  <ul className="list-group list-group-flush">
                    {labs}
                  </ul>
                ) : (
                  <ul className="list-group list-group-flush">
                    {labsJoined}
                  </ul>
                )} 
              </div>
            ) : null }  
          </div>
          {(Object.keys(this.state.lab).length > 0) ? (
            <div className="col-12 col-md-5">
              <Grid 
                demo={true}
                recordType="Lab"
                record={this.state.lab}
              />
            </div>
          ) : null }
          
        </div>
      </div>
    );
  }
}

export default LabJoin;