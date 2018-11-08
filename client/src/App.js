import React, { Component } from 'react';
import PostList from './components/PostList';
import AppFooter from './components/AppFooter';
import AppNavbar from './components/AppNavbar';
import CreatePost from './components/CreatePost';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar></AppNavbar>
       </div>
       <CreatePost></CreatePost>
        <PostList></PostList>
        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default App;
