import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';

class FreezerListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      freezers: []
    };
    this.getAllFreezers = this.getAllFreezers.bind(this);
  }

  getAllFreezers() {
    axios.get(`https://api.biohacking.services/freezers`)
    .then(res => {
      console.log(res.data);
      this.setState({
        freezers: res.data.data
      });        
    })
    .catch(error => {
        console.error(error);        
    });    
  }

  componentDidMount() {
    this.getAllFreezers();
  }

  render() {

    const freezers = this.state.freezers.map((freezer, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/freezers/${freezer._id}`}
        >
          {freezer.name}
        </Link>
      )
    }); 

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-4 col-lg-5">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Freezers</h4>
              </div>
              {(this.state.freezers.length === 0) ? (
                <div className="card-body">
                  <p className="card-text">There are currently no Freezers listed.</p>
                </div>
              ) : null }
              <ul className="list-group list-group-flush">
                <Link 
                  className="list-group-item list-group-item-action bg-success text-light"
                  to={`/freezers/new`}
                >
                  Add New Freezer
                </Link>                
                {freezers}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default FreezerListPage;
