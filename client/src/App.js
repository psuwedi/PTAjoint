import React, { Component } from 'react';
import PostList from './components/PostList';
import AppFooter from './components/AppFooter';
import AppNavbar from './components/AppNavbar';
import CreatePost from './components/CreatePost';
// import Register from './components/Register';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import {
  getFromStorage,
  setInStorage,
} from './utils/storage';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',  
    };
  
  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.name) {
      const { name } = obj;
      this.setState({
        name,
      })
    }
  }
  render() {

    const session = getFromStorage('the_main_app');


    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}></AppNavbar>
       </div>
       {
         (session)?(
          <CreatePost></CreatePost>
         ):("")
       }
       <PostList></PostList>
        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default App;
