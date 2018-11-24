import React, { Component } from 'react';
import 
  {
    Row,
    Container,
    Input,
    Step,
    Stepper,
    Button,
    Col


  } from 'mdbreact';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formActivePanel2: 1,
      formActivePanel2Changed: false,
    }

    let stepper = `        
    <Col md="7">
    { this.state.formActivePanel2 == 1  &&
    (<Col md="12">
      <h3 className="font-weight-bold pl-0 my-4">
        <strong>Basic Information</strong></h3>
      <Input label="Email" className="mt-4" autoFocus={this.calculateAutofocus(2)}/>
      <Input label="Username" className="mt-4"/>
      <Input label="Password" className="mt-4"/>
      <Input label="Repeat Password" className="mt-4"/>
      <Button color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(2)(2)}>next</Button>
    </Col>)}

    { this.state.formActivePanel2 == 2  &&
    (<Col md="12">
      <h3 className="font-weight-bold pl-0 my-4"><strong>Personal Data</strong></h3>
      <Input label="First Name" className="mt-3" autoFocus={this.calculateAutofocus(2)}/>
      <Input label="Second Name" className="mt-3"/>
      <Input label="Surname" className="mt-3"/>
      <Input  label="Address" type="textarea" rows="2"/>
      <Button color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(2)(1)}>previous</Button>
      <Button color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(2)(3)}>next</Button>
    </Col>)}

    { this.state.formActivePanel2 == 3  &&
    (<Col md="12">
      <h3 className="font-weight-bold pl-0 my-4"><strong>Terms and conditions</strong></h3>
      <Input label="I agreee to the terms and conditions" type="checkbox" id="checkbox3" autoFocus={this.calculateAutofocus(2)} />
      <Input label="I want to receive newsletter" type="checkbox" id="checkbox4" />
      <Button color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(2)(2)}>previous</Button>
      <Button color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(2)(4)}>next</Button>
    </Col>)}

    { this.state.formActivePanel2 == 4  &&
    (<Col md="12">
      <h3 className="font-weight-bold pl-0 my-4"><strong>Finish</strong></h3>
      <h2 className="text-center font-weight-bold my-4">Registration completed!</h2>
      <Button color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(2)(3)}>previous</Button>
      <Button color="success" rounded className="float-right" onClick={this.handleSubmission}>submit</Button>
    </Col>)}
  </Col>`;


    
  }

  swapFormActive = (a) => (param) => (e) => {
      this.setState({
        ['formActivePanel' + a]: param,
        ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleNextPrevClick = (a) => (param) => (e) => {
      this.setState({
        ['formActivePanel' + a] : param,
        ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleSubmission = () => {
      alert('Form submitted!');
  }

  calculateAutofocus = (a) => {
      if (this.state['formActivePanel'+a+'Changed']) {
        return true
    }
  }

  render() {
    return(
      <Container>
        <Row className="pt-5 justify-content-center">
          <Col md="2" className="pl-5 pl-md-0 pb-5">
            <Stepper icon vertical>
              <Step icon="folder-open-o" stepName="Basic Information" onClick={this.swapFormActive(2)(1)} vertical></Step>
            <Step icon="pencil" stepName="Personal Data" onClick={this.swapFormActive(2)(2)} vertical></Step>
            <Step icon="photo" stepName="Terms and Conditions" onClick={this.swapFormActive(2)(3)} vertical></Step>
            <Step icon="check" stepName="Finish" onClick={this.swapFormActive(2)(4)} vertical></Step>
          </Stepper>
        </Col>
        `${this.stepper}`
      </Row>
    </Container>
    )
  }
}