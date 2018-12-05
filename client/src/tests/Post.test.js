import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';

it('Post renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Post />, div);
  ReactDOM.unmountComponentAtNode(div);
});