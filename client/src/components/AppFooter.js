
import React, { Component } from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import { Redirect } from 'react-router';

class AppFooter extends Component {
render() {
return (
<Footer color="indigo" dark className="font-small pt-4 mt-4 fixed">
  <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title"> What we offer</h5>
      <p>
      <p><small>A few of the many features avaliable to schools and parents</small></p>

    <div className="row">
      <div className="col-5">
        <p > <i className="fa fa-address-card leftMargin"></i> Contact Management</p>
        <p><small>We'll manage everyone's contact information, making it easy to get a hold of one another.</small></p>
      </div>


      <div className="col-5">
      <p> <i className="fa fa-lock leftMargin"></i> User Privacy</p>

      <p><small>
        Long gone are the days of exchanging emails. We'll ensure that your contact information stays secure.</small></p>
      </div>

    </div>

  

      </p>
      </Col>
     
      <Col md="6">
      <h5 className="title"> Quick Links</h5>
      <div className="row">
      <ul>
        <li className="list-unstyled">
          <a href="/accounts/login" onClick={ <Redirect to="/accounts/login" />} >Login</a>
        </li>
        <li className="list-unstyled">
          <a href="/accounts/register" onClick={ <Redirect to="/accounts/register" />}>Register</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">About Us</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Contact Us</a>
        </li>
      </ul>
      </div>
      </Col>
  
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>
      &copy; {new Date().getFullYear()} Copyright.{" "}
      <a href="#"> PTAjoint </a>
    </Container>
  </div>
</Footer>
);
}
}

export default AppFooter;