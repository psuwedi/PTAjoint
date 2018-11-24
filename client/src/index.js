import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PostList from './components/PostList';
import Register from './components/Register';
import Login from './components/Login';
import ReadView from './components/ReadView';
import CreatePost from './components/CreatePost';




ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/announcements' component={App} />
        <Route path='/accounts/register' component={Register} />
        <Route path='/accounts/login' component={Login} />
        <Route path='/posts/:id' component={ReadView} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();