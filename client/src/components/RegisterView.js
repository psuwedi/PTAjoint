import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import Register from './Register';
import AppFooter from './AppFooter';
import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';

class RegisterView extends Component {
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
        <Register></Register>
        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default RegisterView;

