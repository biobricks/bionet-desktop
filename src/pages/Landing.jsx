import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labs: [],
      labsJoined: []
    };
    this.getAllLabs = this.getAllLabs.bind(this);
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

  componentDidMount() {
    this.getAllLabs();
  }

  render() {

    const labsJoined = this.state.labsJoined.map((lab, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/labs/${lab._id}`}
        >
          {lab.name}
        </Link>
      )
    }); 

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            {(this.props.isLoggedIn) ? (
              <div className="card">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0 text-capitalize">Hello {this.props.currentUser.username}!</h4>
                </div>
                <div className="card-body">
                  {(this.state.labs.length === 0 && this.state.labsJoined === 0) ? (
                    <p className="card-text">
                      Congratulations on your new BioNet installation!<br/> 
                      We can see that you have yet to configure or join your lab(s), let's do that.<br/><br/>
                      <Link to="/labs/configure">Configure New Lab(s)</Link><br/>
                      OR<br/> 
                      <Link to="/labs/join">Join Existing Lab(s)</Link>
                    </p>
                  ) : null }
                  {(this.state.labsJoined.length > 0) ? (
                    <p className="card-text">
                      Welcome back!<br/> 
                      Select a Lab:
                    </p>  
                  ) : null }
                </div>
                {(this.state.labsJoined.length > 0) ? (
                  <ul className="list-group list-group-flush">
                    {labsJoined}
                  </ul>
                ) : null }
              </div>
            ) : (
              <div className="card">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">Welcome To The BioNet!</h4>
                </div>
                <div className="card-body">
                  <h2 className="card-title">A Free Biological Inventory Management System And Browser</h2>
                  <p className="card-text">
                    Keep track of your stuff, find what you need, and share as you like. The bionet supports true asynchronous, peer-peer inventory management and sharing — all your inventory information is controlled locally by you. You decide if others can see what you wish to share. All BioNet software and associated materials are free to use.
                  </p>
                  <h2 className="card-title">How Does It Work?</h2>
                  <iframe 
                    title="BioNet"
                    width="100%" 
                    height="400" 
                    className="mt-1"
                    src="https://www.youtube.com/embed/t29-RGggSU8?ecver=1" 
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen></iframe>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
