import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import Login from './Login';
import AppFooter from './AppFooter';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
}

render() {
    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar></AppNavbar>
       </div>
        <Login></Login>
        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default LoginView;

