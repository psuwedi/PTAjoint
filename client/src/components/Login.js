import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import '../App.css';
import 
    {
        FormInline,
        Input,
        Button,
        Container,
        Jumbotron,
        Col

    } from 'mdbreact';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            hashP:''
        }
    }

    render(){
        return(
            <Container>
            <AppNavbar />
            <Col className="elongate">
            <Jumbotron className='pushDown'>
            <FormInline>
                <Input label="Type your email" icon="envelope" group type="email" />
                <Input label="Type your password" icon="lock" group type="password" />
                <Button color='indigo' >Login</Button>
            </FormInline>
            </Jumbotron>
            </Col>
            <AppFooter />
            </Container>
        );

    }
}

export default Login;