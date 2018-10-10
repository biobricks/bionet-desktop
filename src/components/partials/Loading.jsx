import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-dark text-light">
          <h4 className="card-title mb-0">Loading...</h4>
        </div>
        <div className="card-body">
          <p className="card-text">
            Please be patient while we prepare your content.
          </p>
        </div> 
      </div>
    );
  }
}

export default Loading;
