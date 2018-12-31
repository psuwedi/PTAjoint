import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBBtn, 
    MDBCard, 
    MDBCardBody, 
    MDBInput, 
    MDBCardHeader,
    MDBIcon} from 'mdbreact';

    import {
        getFromStorage,
        setInStorage,
        clearStorage,
      } from '../utils/storage';

class Login extends Component {

        constructor(props) {
          super(props);
      
          this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            email: '',
            password: '',
            redirect: false
          };

          this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
          this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
          
          this.onSignIn = this.onSignIn.bind(this);
        //   this.logout = this.logout.bind(this);
        }

        componentDidMount() {
            const obj = getFromStorage('the_main_app');
            if (obj && obj.token) {
              const { token } = obj;
        
              // Verify token
              axios.get('http://localhost:5000/api/users/account/verify?token=' + token)
                .then(res => res.data)
                .then(res => {
                  if (res.success) {
                    this.setState({
                      token,
                      isLoading: false
                    });
                  } else {
                    this.setState({
                      isLoading: false,
                    });
                  }
                });
            } else {
              this.setState({
                isLoading: false,
              });
            }

            clearStorage();
          }

          onTextboxChangeEmail(event) {
            this.setState({
              email: event.target.value,
            });
          }
        
          onTextboxChangePassword(event) {
            this.setState({
              password: event.target.value,
            });
          }

          
  onSignIn() {
    // Grab state
    const {
      email,
      password,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    axios.post('http://localhost:5000/api/users/account/signin',{
        email,
        password
      })
      .then(res => res.data)
      .then(res => {
        // console.log(this.state);
        if (res.success) {
            
          setInStorage('the_main_app', { token: res.token, name: res.name, userId: res.userId, role: res.role  });
          this.setState({
            redirect: true,
            signInError: res.message,
            isLoading: false,
            password: '',
            email: '',
            token: res.token,
          });
            // window.location.assign("/");
        } else {
          this.setState({
            signInError: res.message,
            isLoading: false,
          });
        }
      });

      
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
                  <MDBIcon icon="user" /> Login
                </h3>
            </MDBCardHeader>
            <MDBCardBody className="mx-4 mt-4">
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
                  color="danger"
                  type="button"
                  className="btn-block z-depth-2"
                  onClick={this.onSignIn}
                >
                {
                    (this.state.isLoading) ? (
                        <span>Loading...</span>
                    ) : (<span>Log In</span>)
                }
                </MDBBtn>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Don't have an account?
                <Link
                  to="/accounts/register"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Sign up
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )};
}

export default Login;