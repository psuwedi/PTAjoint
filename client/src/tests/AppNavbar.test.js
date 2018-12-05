import React from 'react';
import ReactDOM from 'react-dom';
import AppNavbar from '../components/AppNavbar';

it('AppNavbar renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});