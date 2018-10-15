import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';

class FreezerNew extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      newFreezer: {
        parentId: "",
        name: "",
        description: "",
        temperature: -80
      }
    };
    this.updateFreezer = this.updateFreezer.bind(this);
    this.submitNewFreezer = this.submitNewFreezer.bind(this);
    this.handleNewFreezerFormSubmit = this.handleNewFreezerFormSubmit.bind(this);
  }

  updateFreezer(e) {
    const field = e.target.name;
    const newFreezer = this.state.newFreezer;
    if(field === 'temperature') {
      newFreezer[field] = Number(e.target.value);
    } else {
      newFreezer[field] = e.target.value;
    }
    this.setState({
      newFreezer
    });    
  }

  submitNewFreezer(freezer) {
    if(freezer.name.length > 0){
      let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`
        },
        'json': true
      };  
      axios.post('https://api.biohacking.services/freezers/new', freezer, config)
      .then(res => {
        //console.log(res.data)        
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.error(error);
        this.setState({ newFreezer: freezer });
      });      
    }  
  }

  handleNewFreezerFormSubmit(e) {
    e.preventDefault();
    let newFreezer = this.state.newFreezer;
    this.setState({
      newFreezer: {
        name: "",
        description: ""      
      }
    });
    this.submitNewFreezer(newFreezer);
  }

  render() { 
    if (this.state.redirect === true) {
      return ( <Redirect to="/freezers"/> )
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-7">

            { (this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
              <div className="card mt-3">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">New Freezer</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleNewFreezerFormSubmit}>

                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                        name="name"
                        className="form-control"
                        value={this.state.newFreezer.name}
                        onChange={this.updateFreezer}
                        placeholder="Freezer Name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Description</label>
                      <input 
                        name="description"
                        type="text"
                        className="form-control"
                        value={this.state.newFreezer.description}
                        onChange={this.updateFreezer}
                        placeholder="A short description of the Freezer."
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Temperature (C)</label>
                      <input 
                        name="temperature"
                        type="number"
                        className="form-control"
                        value={this.state.newFreezer.temperature}
                        onChange={this.updateFreezer}
                        min="-80"
                        step="1"
                      />
                    </div>

                    <div className="form-group text-center">
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <Link to="/freezers" className="btn btn-secondary mt-3">Back</Link>
                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                      </div>  
                    </div>                    

                  </form>
                </div>
              </div>
            ) : null }  
          </div>
        </div>
      </div>
    );
  }
}

export default FreezerNew;