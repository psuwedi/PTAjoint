import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Posts from './components/Posts';
import Post from './components/Post';




ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/posts' component={Posts} />
        <Route path='/posts/:id' component={Post} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();