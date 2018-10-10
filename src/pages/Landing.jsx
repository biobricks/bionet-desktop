import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-7 col-lg-5 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Welcome To The BioNet!</h4>
              </div>
              <div className="card-body">
                <h2 className="card-title">A Free Biological Inventory Management System And Browser</h2>
                <p className="card-text">
                  Keep track of your stuff, find what you need, and share as you like. The bionet supports true asynchronous, peer-peer inventory management and sharing — all your inventory information is controlled locally by you. You decide if others can see what you wish to share. All BioNet software and associated materials are free to use.
                </p>
                <h2 class="card-title">How Does It Work?</h2>
                <iframe 
                  title="BioNet"
                  width="100%" 
                  height="400" 
                  class="mt-1"
                  src="https://www.youtube.com/embed/t29-RGggSU8?ecver=1" 
                  frameborder="0" 
                  allow="autoplay; encrypted-media" 
                  allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
