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
import GroupPosts from './components/GroupPosts';
import Announcements from './components/Announcements';
import Calendar from './components/Calendar';
import ProfileRead from './components/ProfileRead';
import Comment from './components/Comment';
import StaffList from './components/StaffList';




ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/home' component={App} />
        <Route exact path='/' component={App} />
        <Route path='/group_posts' component={GroupPosts} />
        <Route path='/announcements' component={Announcements} />
        <Route path='/groups' component={Groups} />        
        <Route path='/accounts/register' component={RegisterView} />
        <Route path='/accounts/login' component={LoginView} />
        <Route path='/profile' component={ProfileRead} />
        <Route path='/posts/:id' component={ReadView} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/comment' component={Comment} />
        <Route path='/staff' component={StaffList} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();