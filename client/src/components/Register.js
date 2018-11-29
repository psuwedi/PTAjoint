import React, { Component } from "react";
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBBtn, 
  MDBInput,
  MDBCard, 
  MDBCardHeader,
  MDBIcon,
  MDBCardBody
} from 'mdbreact';

import {
  setInStorage,
} from '../utils/storage';

import axios from 'axios';

class Signup extends Component {



  constructor(props) {
    super(props);

    this.state = {
        firstName:'',
        lastName: '',
        password:' ',
        confirmPassword:'',
        email:''
    }

    this.submitHandler = this.submitHandler.bind(this);
    // this.logNewUserIn = this.logNewUserIn.bind(this);
    // this.reloadPosts = this.reloadPosts.bind(this);
}


  submitHandler = (event) => {
    event.preventDefault();

    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let confirmPassword = event.target.confirmPassword.value;


    if (firstName.trim()==null || firstName.trim()==""|| firstName===" ") {
        alert("First name must be filled out");
        return false;
    }
   
    if (lastName.trim()==null || lastName.trim()==""|| lastName===" ") {
        alert("last name must be filled out");
        return false;
    }
      if (email.trim()==null || email.trim()==""|| email===" ") {
        alert("Email must be filled out");
        return false;
    }
    if ( password.trim()==null || password.trim()==""|| password===" ") {
      alert("password must be filled out");
      return false;
     }
     if (confirmPassword.trim()==null || confirmPassword.trim()==""|| confirmPassword===" ") {
      alert("Renter your password");
      return false;
     }

     if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
     }

    

  //   this.setState({ 
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //     confirmPassword: confirmPassword
  // });

  // return console.log('state: '+this.state.length);
    

    // Persist newly created user

    axios
    .post('http://localhost:5000/api/users/account/signup', {
          firstName,
          lastName,
          email,
          password
        })
      .then(res => {
         
        console.log(res.data);
      });


      axios.post('http://localhost:5000/api/users/account/signin',{
        email,
        password
      })
      .then(res => res.data)
      .then(res => {
        // console.log(this.state);
        if (res.success) {
            
          setInStorage('the_main_app', { token: res.token, name: res.name, userId: res.userId  });
          this.setState({
            redirect: true,
            signInError: res.message,
            isLoading: false,
            password: '',
            email: '',
            token: res.token,
          });
        } else {
            alert("Login failed, try again")
            return false;
          }
        });
      }


    

    


  render(){
  return (
    <MDBContainer className="pushDown justify-content-center" >
    <MDBRow>
      <MDBCol md="8" className="offset-md-2">
        <MDBCard>
          <MDBCardHeader className="form-header deep-blue-gradient rounded">
              <h3 className="my-3 text-center">
                <MDBIcon icon="user" /> Sign Up
              </h3>
          </MDBCardHeader>
          <MDBCardBody className="mx-4 mt-4">
          <form onSubmit={this.submitHandler} noValidate>
            <div className="grey-text">
              <MDBInput
                label="First name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="firstName"
              />
              <MDBInput
                label="Last name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="lastName"
              />
              <MDBInput
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
              />
              <MDBInput
                label="Password"
                icon="lock"
                group
                type="password"
                name="password"
                validate
              />
              <MDBInput
                label="Confirm password"
                icon="exclamation-triangle lock"
                group
                type="password"
                validate
                error="wrong"
                success="right"
                name="confirmPassword"
              />
            </div>
            <div className="text-center">
             
                <MDBBtn color="primary"  className="btn-block changeColor " type="submit">Register</MDBBtn>
           
            </div>
            <p className="font-small mt-4 grey-text d-flex justify-content-center">
                Already have an account?
                <a
                  href="#!"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Login
                </a>
              </p>
          </form>
          </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )};
};

export default Signup;