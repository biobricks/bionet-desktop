import React, { Component } from "react";
import ReactFileReader from "react-file-reader";

class Csvform extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmitedFiles = this.handleSubmitedFiles.bind(this);
    this.renderFileDemo = this.renderFileDemo.bind(this);
  }
  downloadFile = url => {
    window.open(url);
  };

  handleSubmitedFiles = files => {
    const fileObject = files.fileList;
    const fileBase64 = files.base64;
    const reader = new FileReader();

    this.setState({ fileObject, fileBase64 });
    this.setState({ fileName: this.state.fileObject[0].name });
    this.setState({
      lastModified: this.state.fileObject[0].lastModifiedDate.toString()
    });

    reader.readAsText(fileObject[0]);
    reader.onload = () => {
      console.log(reader.result);
    };
  };

  renderFileDemo = () => {
    if (this.state.fileName != null) {
      return (
        <ul className="list-group">
          <li className="list-group-item">
            <a href={this.state.fileBase64}>{this.state.fileName}</a>
          </li>
          <li className="list-group-item">{this.state.lastModified}</li>
        </ul>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">
                  Welcome To The CSV submit page!
                </h4>
              </div>
              <div className="card-body">
                <h3 className="card-title">Use this page to upload CSV file</h3>
                <ReactFileReader
                  fileTypes={".csv"}
                  base64={true}
                  multipleFiles={false}
                  handleFiles={this.handleSubmitedFiles}
                >
                  <button className="btn">Upload</button>
                </ReactFileReader>
              </div>
              {this.renderFileDemo()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Csvform;
