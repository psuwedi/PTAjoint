import React from 'react';
import ReactDOM from 'react-dom';
import ReadView from '../components/ReadView';

it('ReadView renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReadView />, div);
  ReactDOM.unmountComponentAtNode(div);
});