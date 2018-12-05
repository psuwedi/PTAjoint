import React from 'react';
import ReactDOM from 'react-dom';
import PostList from '../components/PostList';

it('PostList renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostList />, div);
  ReactDOM.unmountComponentAtNode(div);
});