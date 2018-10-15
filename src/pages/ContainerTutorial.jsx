import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';

import Grid from '../components/partials/Grid';

class ContainerTutorial extends Component {
  
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
                  <h4 className="card-title mb-0">Create Your First Container</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Let's setup a Container within {this.state.lab.name}! Your Container will need:
                  </p>  
                  <form onSubmit={this.handleFormSubmit}>

                    <input 
                      name="parent"
                      type="hidden"
                      value={this.state.lab._id}
                    />

                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                        name="name"
                        type="text"
                        className="form-control"
                        value={this.state.form.name}
                        onChange={this.updateField}
                        placeholder="Container Name"
                      />
                      <small className="form-text text-muted">Required - The name of your Container. This will be public and visible to other Labs.</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Description</label>
                      <input 
                        name="description"
                        type="text"
                        className="form-control"
                        value={this.state.form.description}
                        onChange={this.updateField}
                        placeholder="A short description of the Container."
                      />
                      <small className="form-text text-muted">Optional - Share a bit more detail on your Container. Visible to the public and other Labs.</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Columns</label>
                      <input 
                        name="columns"
                        type="number"
                        className="form-control"
                        value={this.state.form.columns}
                        onChange={this.updateField}
                        min="1"
                        max="50"
                        step="1"
                      />
                      <small className="form-text text-muted">Required - The number of columns in the grid representing your Container area from a top-down view.</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Rows</label>
                      <input 
                        name="rows"
                        type="number"
                        className="form-control"
                        value={this.state.form.rows}
                        onChange={this.updateField}
                        min="1"
                        max="50"
                        step="1"
                      />
                      <small className="form-text text-muted">Required - The number of rows in the grid representing your Container area from a top-down view.</small>
                    </div>

                    <div className="form-group text-center">
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <Link to="/" className="btn btn-secondary mt-3">Exit Tutorial</Link>
                        <button type="submit" className="btn btn-success mt-3" disabled={true}>Submit</button>
                      </div>  
                    </div>                    

                  </form>
                </div>
              </div>
            ) : null }  
          </div>

          <div className="col-12 col-md-5">
            <Grid 
              demo={true}
              recordType="Container"
              record={this.state.form}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default ContainerTutorial;