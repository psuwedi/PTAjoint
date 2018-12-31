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
          groupId: getFromStorage("the_main_app").groupId,
          errorLoadingData: false,
          posts: [],
          postIds: [],
        };

        
        this.loadPosts = this.loadPosts.bind(this);
      }

      


       loadPosts(){

        const { groupId } = this.state;
        let groupPosts = [];
      
          axios.get(`http://localhost:5000/api/posts/`)
                .then(
                  res => {
                    // res.data.map((post, i) => {
                    //   if(!post.tags.indexOf(groupId)>-1){
                    //    groupPosts.push(post);
                    //   }
                    // })

                  // console.log("Posts in group: "+groupPosts.length)
                  this.setState({posts: res.data});

                  console.log("Posts ib state: "+ this.state.posts)
                  
                  }); 

                  // this.setState({posts: groupPosts })
                  // console.log("Posts in group: "+res.data)

                     
      };
      // saveGroupPosts(groupPosts);

    
    
      componentDidMount() {

          // this.loadData(); 

          // this.setState({groupId: getFromStorage("the_main_app").groupId});
           setTimeout(this.loadPosts());

          //  setTimeout(this.setState({posts: this.loadPosts}))
           
          
      }
      

    

    render() {

      const { isLoading, posts } = this.state;
   
        if(isLoading){
          return <Spinner />
        } else {
        return (
          <React.Fragment>	
            {
              (posts.length<1)?(
                <div className="jumbotron">
                  <h1 className="text-center">&#9785;</h1>
                  <p className="text-center mt-4 mb-4 mr-4 ml-4">No posts in this group - GP.</p>
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



