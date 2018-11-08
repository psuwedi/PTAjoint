import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
          this.setState({ posts: res.data });
          console.log(this.state.posts);
        });
      }
    
      componentDidMount() {

          this.loadData()
          
      }
    

    render() {
        return (
			<div>	
				{this.state.posts.map((post, i) =>
					<Post post = {post} key={i} timestamp={new Date(post.createdAt)}></Post>
				)}
			</div>
        );
    }
  }
  
  export default PostList;



