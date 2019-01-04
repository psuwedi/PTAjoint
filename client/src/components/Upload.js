import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact'
import axios from 'axios';

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0, 
        };

        this.reloadFiles = this.reloadFiles.bind(this);
    }

    handleselectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }


      handleUpload = (event) => {

        event.preventDefault();
          if(!this.state.selectedFile){
              alert("Please select a file")
              return false;
          }
        const data = new FormData();
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    
        axios
          .post('http://localhost:5000/api/files/upload', data, {
            onUploadProgress: ProgressEvent => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
              })

              if(this.state.loaded ===100){
                  this.reloadFiles();
              }
            },
          })
          .then(res => {
            console.log(res.statusText)
          })
      }

      reloadFiles(){

        window.location.reload();
      }

    render () {

        return(
            <MDBContainer>
           
            <form enctype="multipart/form-data">
                <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="" onClick={this.handleUpload}>
                    Upload
                    </span>
                </div>
                <div className="custom-file">
                    <input
                    type="file"
                    className="custom-file-input"
                    id=""
                    name=""
                    onChange={this.handleselectedFile}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                    </label>
                </div>
                <div className="ml-2 mt-2"> {Math.round(this.state.loaded,2) } %</div>
                </div>
            </form>
          
            </MDBContainer>

        )
    }
}

export default Upload;