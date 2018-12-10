import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import Spinner from './Spinner';

class GroupPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          groupId: this.props.groupId,
          posts: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){
        this.setState({
          isLoading: true
        });
        axios.get('http://localhost:5000/api/group/'+this.state.groupId+'/posts')
        .then(res => {
          this.setState({ posts: res.data, isLoading: false });
          console.log(res.data);
        });
      }
    
      componentDidMount() {

          this.loadData()
          
      }
      
    

    render() {

      const { isLoading } = this.state;
   
        if(isLoading){
          return <Spinner />
        } else {
        return (
          <React.Fragment>	
            {this.state.posts.map((post, i) =>
              <Post post = {post} key={i} timestamp={new Date(post.createdAt)}></Post>
            )}
          </React.Fragment>
        );
      }
    }
  }
  
  export default GroupPosts;



