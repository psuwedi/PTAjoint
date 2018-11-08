import React, { Component } from 'react';
import AppFooter from './AppFooter';
import {Link, Redirect} from 'react-router-dom';
import AppNavbar from './AppNavbar';
import TimeAgo from './TimeAgo';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import { Button, Card, CardBody, CardTitle, CardText } from 'mdbreact';
import axios from 'axios';




class ReadView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts:[],
          post: {},
          postId: this.props.match.params.id
        };

      
        this.deletePost = this.deletePost.bind(this);
        this.reloadPosts = this.reloadPosts.bind(this);
      }

    //Return to post index page after deleting post 

        reloadPosts (){     
          window.location.assign("/");
      }

    //Delete post 

    deletePost (){
      axios
        .delete('http://localhost:5000/api/posts/'+this.state.postId)
          .then(res => {
            this.reloadPosts();
            console.log("Post deleted!");
          });
        }
  
    
      componentDidMount() {
        axios.get('http://localhost:5000/api/posts/'+this.state.postId)
          .then(res => {
            this.setState({ post: res.data });
            console.log(this.state.post);
          });

        // this.setState({ post: this.props.post });
       
        
      }
  render() {
    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar></AppNavbar>
       </div>
       
       <div className="postCard">
        <div className="row justify-content-center">
          <div className="col-md-8">

      <Card className="pushDown">
        <CardBody>
            <CardTitle><small>{this.state.post.title}</small></CardTitle>
            <CardText>
              <p><small>By John Doe</small></p>
              <p>{this.state.post.content}</p>
              <p><small>Posted 5 seconds</small></p>
            </CardText>
           
        </CardBody>
    </Card>
    <div className="row justify-content-md-center">
    <div className="col-12 col-md-auto">
            
            <Link to="/">
              <Button color="primary" rounded outline><i className="fa fa-angle-double-left leftMargin"></i>View all posts</Button>
            </Link>
         
            <Link to="/">
              <Button onClick={this.deletePost} color="danger" rounded outline><i className="fa fa-trash leftMargin"></i>Delete Post</Button>
            </Link>
       
    </div>
    </div>
          </div>
        </div>
       </div>

       




        <AppFooter></AppFooter>
      </div>
      </div>
    );
  }
}

export default ReadView;
