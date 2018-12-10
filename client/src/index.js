import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PostList from './components/PostList';
import Home from './components/Home/Home';
import ReadView from './components/ReadView';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import Groups from './components/Groups';
import GroupPostsReadView from './components/GroupPostsReadView';




ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/home' component={App} />
        <Route exact path='/' component={App} />
        <Route path='/gposts' component={GroupPostsReadView} />
        <Route path='/announcements' component={App} />
        <Route path='/groups' component={Groups} />        
        <Route path='/accounts/register' component={RegisterView} />
        <Route path='/accounts/login' component={LoginView} />
        <Route path='/posts/:id' component={ReadView} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();