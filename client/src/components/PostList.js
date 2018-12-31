import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import Spinner from './Spinner';
class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          posts: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){
        this.setState({
          isLoading: true
        });
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
          res.data.map((post, i) => {
            
            //Remove announcements from the main post index
            if(post.tags.includes("5c274dc9abeaa32ba09ce3ed")){
              res.data.splice(i, 1);
            }
          })
         
          this.setState({ posts: res.data, isLoading: false });
          console.log(res.data);
        });
      }


    
      componentDidMount() {

          this.loadData()
          
      }
      
    

    render() {

      //show loading animation if page is still loading
      
      const { isLoading, posts } = this.state;
   
        if(isLoading){
          return <Spinner />
        } else {
        return (
          <React.Fragment>	
            {posts.map((post, i) =>
              
              <Post post = {post} key={i} timestamp={new Date(post.createdAt)}></Post>
            )}
          </React.Fragment>
        );
      }
    }
  }
  
  export default PostList;



