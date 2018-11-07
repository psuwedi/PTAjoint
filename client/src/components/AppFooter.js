
import React, { Component } from "react";
import { Col, Container, Row, Footer } from "mdbreact";

class AppFooter extends Component {
render() {
return (
<Footer c color="indigo" dark className="font-small pt-4 mt-4">
  <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title">Footer Content</h5>
      <p>
        Curabitur aliquet quam id dui posuere blandit. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit.
      </p>
      </Col>
      <Col md="6">
      <h5 className="title"> Quick Links</h5>
      <ul>
        <li className="list-unstyled">
          <a href="#!">Posts</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Donate</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">About Us</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Contact Us</a>
        </li>
      </ul>
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