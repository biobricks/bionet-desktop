import React, { Component } from "react";
import ReactFileReader from "react-file-reader";

class Cvsfrom extends Component {
  state = {};
  constructor() {
    super();
    this.state = {};
  }
  handleSubmitedFiles = files => {
    console.log(files.base64);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">
                  Welcome To The CSV form page!
                </h4>
              </div>
              <div className="card-body">
                <h3 className="card-title">
                  Use this page to upload CSV files or zip folders
                </h3>
                <ReactFileReader
                  fileTypes={[".csv", ".zip"]}
                  base64={true}
                  multipleFiles={true}
                  handleFiles={this.handleSubmitedFiles}
                >
                  <button className="btn">Upload</button>
                </ReactFileReader>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cvsfrom;
