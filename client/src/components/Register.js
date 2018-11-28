import React from "react";
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBBtn, 
  MDBInput } from 'mdbreact';

const Signup = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign up</p>
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
                type="text"
                validate
                error="wrong"
                success="right"
                name="confirmPassword"
              />
            </div>
            <div className="text-center">
              <MDBBtn color="primary">Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;