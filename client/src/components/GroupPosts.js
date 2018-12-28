/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import Spinner from './Spinner';
import { getFromStorage, saveGroupPosts } from '../utils/storage';

class GroupPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          groupId: "",
          errorLoadingData: false,
          posts: [],
          postIds: [],
        };

        this.loadData = this.loadData.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
      }

      loadData(){
        this.setState({
          isLoading: true
        });
        axios.get(`http://localhost:5000/api/groups/${getFromStorage("the_main_app").groupId}/posts`)
        .then(res => {

          if(res.data.success){
            this.setState({ postIds: res.data.posts, isLoading: false });

          } else{

            this.setState({ errorLoadingData: true, isLoading: false});
          }
         
          // console.log(res.data);
        });
      }


       loadPosts(){

        const { postIds } = this.state;
        let groupPosts = [];
        
        postIds.map((postId, i) => {
          axios.get(`http://localhost:5000/api/posts/${postId}`)
                .then(
                  res => {
                    groupPosts.push(res.data);
                    this.setState({posts: this.state.posts.push(res.data) })
                    console.log("Posts: "+this.state.posts)
                  }

                );      
      });
      saveGroupPosts(groupPosts);

    }
    
      componentDidMount() {

          this.loadData(); 
          this.loadPosts();
          this.setState({groupId: getFromStorage("the_main_app").groupId});
          
      }
      

    

    render() {

      const { isLoading, posts } = this.state;
   
        if(isLoading){
          return <Spinner />
        } else {
        return (
          <React.Fragment>	
            {
              (this.state.posts.length<1)?(
                <div className="jumbotron">
                  <h1 className="text-center">&#9785;</h1>
                  <p className="text-center mt-4 mb-4 mr-4 ml-4">No posts in this group.</p>
                </div>
              ):(
                     
                      posts.map((post, i) =>{
                       <Post post={post} key={i} timestamp={new Date(post.createdAt)}></Post>
                      })
                    
                  )

              (this.state.errorLoadingData)?(
              <div className="jumbotron">
                <h1 className="text-center">&#9785;</h1>
                <p className="text-center mt-4 mb-4 mr-4 ml-4">There was an error loading the page.</p>
              </div>):("")

            }
          </React.Fragment>
        );
      }
    }
  }
  
  export default GroupPosts;



