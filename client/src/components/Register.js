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
  MDBCardBody,
  Container, Input
} from 'mdbreact';

import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  setInStorage
} from '../utils/storage';

import { log_user_in} from '../utils/common';

class Signup extends Component {



  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        firstName:'',
        lastName: '',
        password:' ',
        confirmPassword:'',
        email:'',
        userRole: 0,
        redirect: false,
        token:'',
        history: this.props.history
    }

    this.submitHandler = this.submitHandler.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onTextboxChangeConfirmPassword = this.onTextboxChangeConfirmPassword.bind(this);
    this.setUserRoleParent = this.setUserRoleParent.bind(this);
    this.setUserRoleTeacher = this.setUserRoleTeacher.bind(this);

   
}



  submitHandler(event){
    // event.preventDefault();

    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userRole
    } = this.state;


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
    

    // Persist newly created user

    this.setState({
      isLoading: true,
    });

     axios
    .post('http://localhost:5000/api/users/account/signup', {
          firstName,
          lastName,
          email,
          password,
          role: userRole
        })
      .then(res => res.data)
      .then(res => {

        if(res.user){
          setInStorage('the_main_app', { name: res.user.firstName+' '+res.user.lastName, userId: res.user._id  });
          this.setState({ 
            redirect: true,
            email,
            password
          })
          this.setState({ isLoading: false})
           console.log(this.state);
          
              }
            })
        }
         

        async redirectToLogin(){

          await this.submitHandler();
          log_user_in(this.state.email, this.state.password);
        }

        onTextboxChangeFirstName(event) {
          this.setState({
            firstName: event.target.value,
          });
        }

        onTextboxChangeLastName(event) {
          this.setState({
            lastName: event.target.value,
          });
        }

        onTextboxChangePassword(event) {
          this.setState({
            password: event.target.value,
          });
        }

        onTextboxChangeConfirmPassword(event) {
          this.setState({
           confirmPassword : event.target.value,
          });
        }
        

        onTextboxChangeEmail(event) {
          this.setState({
            email: event.target.value,
          });
        }

        setUserRoleTeacher(){
            this.setState({userRole: 1});
        }

        setUserRoleParent(){
          this.setState({userRole: 0});
      }

    

    


  render(){


    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/home' />;
    }
    
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
            <MDBInput 
                label="First Name" 
                group 
                type="text" 
                required 
                validate 
                icon="user" 
                name="firstName"
                onChange={this.onTextboxChangeFirstName} />
              <MDBInput 
                label="Last Name" 
                group 
                type="text" 
                required 
                validate 
                icon="user" 
                name="lastName"
                onChange={this.onTextboxChangeLastName} />
              <MDBInput 
                label="Your email" 
                group 
                type="email" 
                required 
                validate 
                icon="envelope" 
                name="email"
                onChange={this.onTextboxChangeEmail} />
              <MDBInput
                label="Your password"
                group
                type="password"
                name="password"
                validate
                containerClass="mb-0"
                icon="lock"
                onChange={this.onTextboxChangePassword}
              />
              <MDBInput
                label="Your password"
                group
                type="password"
                name="password"
                validate
                containerClass="mb-0"
                icon="lock"
                onChange={this.onTextboxChangeConfirmPassword}
              />



            <Container className="mt-5">
            <h5 >
              Sign Up As
            </h5>
          <Input
            onClick={this.setUserRoleParent}
            checked={this.state.userRole == 0 ? true : false}
            label="Parent"
            type="radio"
            id="userRole"
          />
          <Input
            onClick={this.setUserRoleTeacher}
            checked={this.state.userRole == 1 ? true : false}
            label="Teacher"
            type="radio"
            id="userRole"
          />
        </Container>



              <p className="font-small grey-text d-flex justify-content-end">
                Forgot
                <a
                  href="#!"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Password?
                </a>
              </p>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="primary"
                  type="button"
                  className="btn-block z-depth-2"
                  onClick={this.submitHandler}
                >
                {
                    (this.state.isLoading) ? (
                        <span>Loading...</span>
                    ) : (<span>Sign Up</span>)
                }
                </MDBBtn>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Already have an account?
                <Link
                  to="/accounts/login"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Login
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )};
};

export default Signup;