import React, { Component } from 'react';
import Upload from './Upload';
import AppNavbar from './AppNavbar'
import AppFooter from './AppFooter';
import { 
    MDBCardBody,  
    MDBContainer,
    MDBCard,
    MDBIcon
} from "mdbreact";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import { getFromStorage } from '../utils/storage';

class Files extends Component {


    constructor(props) {
        super(props);
        this.state = {
          name: '',
          role: null,
          isLoading: true,
          files: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){

        this.setState({ isLoading: true });
        axios.get('http://localhost:5000/api/files')
        .then(res => {
          this.setState({ files: res.data, isLoading: false });
        //   console.log(this.state.groups);
        });
      }

      componentDidMount() {

        //get the user's name from local storage

        const obj = getFromStorage('the_main_app');
        if (obj && obj.name) {
          const { name } = obj;
          this.setState({
            name,
          })
        }

        if (obj && obj.role) {
          const { role } = obj;
          this.setState({
            role,
          })
        }

        //load all the required data
        
        this.loadData()
        
    }


      render(){

        {
            if(this.state.isLoading){
              return <Spinner />;
            }
          }

          return(
            <MDBContainer>
                <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}></AppNavbar>
                <div className="col-md-8 col-md-offset-2 pushDown">
                {
                (this.state.role ===2 || this.state.role===1)?(
                    <div className="mt-4 mb-4">
                    <Upload></Upload>
                    </div>
                ):("")
                }

                <React.Fragment>	
                {this.state.files.map((file, i) =>
                
                    
                <MDBCard color="success-color" text="white" className="pushDown">
                <MDBCardBody>
                    <span className="text-justify">
                    {file.name}
                    </span>
                    
                    <a href={file.path} >


                    <span className="mr-2">
                    <MDBIcon icon="download" />
                    </span>
                    </a>
                    
                    
                </MDBCardBody>
                </MDBCard>
					
				)}
			    </React.Fragment>
                </div>
                <AppFooter></AppFooter>
            </MDBContainer>
          )
      }

}

export default Files;
