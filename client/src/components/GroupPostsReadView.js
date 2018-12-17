import React, { Component } from 'react';
import GroupPosts from './GroupPosts';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import CreatePost from './CreatePost';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import {
  getFromStorage,
} from '../utils/storage';



class GroupPostsReadView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '', 
      groupId: '' 
    };
  
  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.name) {
      const { groupId, name } = obj;
      this.setState({
        name,
        groupId
      })
    }
  }
  render() {
    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}></AppNavbar>
       </div>
        <CreatePost></CreatePost>
        <GroupPosts groupId={this.state.groupId}></GroupPosts>
        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default GroupPostsReadView;
