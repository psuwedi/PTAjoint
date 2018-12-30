import React, { Component } from 'react';
import axios from 'axios';

import Post from '../components/Post';
import Spinner from '../components/Spinner';
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';
import { MDBContainer} from 'mdbreact';


import { getFromStorage, SaveDataToLocalStorage } from '../utils/storage';
import { Redirect } from 'react-router';

class Announcemnets extends Component {


    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          name:"",
          redirect: false,
          posts: []
        };

        this.getPosts = this.getPosts.bind(this);
        this.getUser = this.getUser.bind(this);

    }

    getPosts(){

        axios.get('http://localhost:5000/api/posts/')
            .then( res => {

                let announcemnets = [];

                res.data.map((post, i) =>{
                    if(post.tags.includes("5c274dc9abeaa32ba09ce3ed")){
                        announcemnets.push(post)
                    }
                });

                this.setState({ posts: announcemnets, isLoading: false})
            })
    }
    

    getUser(){

        let name = getFromStorage("the_main_app").name;

        this.setState({name})


    }
    
    componentDidMount() {

        this.getPosts();

        //Retrieve the currently logged in user
        this.getUser();

        
    }

    render(){

        //show loading animation if page is still loading
      
      const { isLoading, posts } = this.state;

      
   
      if(isLoading){
        return <Spinner />
      } 
       
      return (

        <MDBContainer>
        <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}/>
        {
            (this.state.posts.length<1)?(
                 <div className="jumbotron">
                 <h1 className="text-center">&#9785;</h1>
                 <p className="text-center mt-4 mb-4 mr-4 ml-4">No announcements at the moment.</p>
             </div>
             ):(
                	
                posts.map((post, i) => 
                    <Post post = {post} key={i} timestamp={new Date(post.createdAt)}></Post>
                )
    
              )
           
         }
         <AppFooter />
         </MDBContainer>
        
      );
    }
        

    
    };
    

export default Announcemnets;