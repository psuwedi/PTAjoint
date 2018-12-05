import React from 'react';
import ReactDOM from 'react-dom';
import AppFooter from '../components/AppFooter';

it('AppFooter renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
