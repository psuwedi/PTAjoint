/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import Spinner from './Spinner';
import { getFromStorage } from '../utils/storage';
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';
import { MDBContainer} from 'mdbreact';

class GroupPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          groupId: '',
          errorLoadingData: false,
          posts: [],
          name:"",
        };

        
      this.loadPosts = this.loadPosts.bind(this);
      }

      



      // saveGroupPosts(groupPosts);

    
    
      componentDidMount() {

        const obj = getFromStorage('the_main_app');
        if (obj && obj.name) {
          const { groupId, name } = obj;
          this.setState({
            name,
            groupId,
           
          })
        }

          this.loadPosts(); 
           
          
      }

      loadPosts(){

        this.setState({isLoading: true});

       
       
      
        axios.get('http://localhost:5000/api/posts/')
        .then( res => {

          let groupPosts = [];
          const { groupId } = this.state; 

            res.data.map((post, i) =>{
                if(post.tags.includes(groupId)){
                  groupPosts.push(post)
                }
            });

            this.setState({ posts: groupPosts, isLoading: false})
        })
    
                     
      };
      

    

    render() {
    
      
      
      const { isLoading, posts } = this.state;

    
        if(isLoading){
          return <Spinner />
        } else {
        return (
        <MDBContainer>
        <div className="mb-4">
          <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}/>
        </div>
            {
              (posts.length<1)?(
                <div className="jumbotron">
                  <h1 className="text-center">&#9785;</h1>
                  <p className="text-center mt-4 mb-4 mr-4 ml-4">No posts in this group - GP.</p>
                </div>
              ):(
                     
                posts.map((post, i) =>
                       <Post post={post} key={i} timestamp={new Date(post.createdAt)}></Post>
                      )

                
                 
                  )

            }
          <AppFooter />
         </MDBContainer>
        );
      }
    }
  }
  
  export default GroupPosts;



