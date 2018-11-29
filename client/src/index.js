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




ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/home' component={App} />
        <Route path='/announcements' component={App} />
        <Route path='/check' component={RegisterView} />
        <Route path='/accounts/signup' component={Home} />
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