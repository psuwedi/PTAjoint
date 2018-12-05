import React from 'react';
import ReactDOM from 'react-dom';
import CreatePost from '../components/CreatePost';

it('CreatePost renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatePost />, div);
  ReactDOM.unmountComponentAtNode(div);
});