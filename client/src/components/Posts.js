import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/api/posts')
          .then(res => {
            this.setState({ posts: res.data });
            console.log(this.state.posts);
          });
      }
    

    render() {
        return (
			<div>	
				{this.state.posts.map(post =>
					<Post post = {post} key={post.id}></Post>
				)}
			</div>
        );
    }
  }
  
  export default Posts;



