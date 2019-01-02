import React, { Component } from 'react';
import AppFooter from './AppFooter';
import {Link} from 'react-router-dom';
import AppNavbar from './AppNavbar';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import { Button, Card, CardBody, CardTitle, CardText, Input } from 'mdbreact';
import axios from 'axios';
import Comment from '../components/Comment';
import { getFromStorage } from '../utils/storage';




class ReadView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post: {},
          postId: this.props.match.params.id,
          hideUpdateView: true,
          name: '',
          author: ''
        };

      
        this.deletePost = this.deletePost.bind(this);
        this.reloadPosts = this.reloadPosts.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.loadPost = this.loadPost.bind(this);
        this.get_author_name = this.get_author_name.bind(this);
        this.format_date_created = this.format_date_created.bind(this);
        
      }

      updatePost = (event) =>{
     
          event.preventDefault();
  
          let title = event.target.title.value;
          let content = event.target.content.value;
  
          if (title.trim()==null || title.trim()==""|| title===" ") {
              alert("Title must be filled out");
              return false;
          }
         
          if (content.trim()==null || content.trim()==""|| content===" ") {
              alert("Content must be filled out");
              return false;
          }
  
     
          this.setState({ title, content})
          
  
          // Save post to DB
          
  
          axios
          .put('http://localhost:5000/api/posts/'+this.state.postId, {
                  title,
                  content
              })
            .then(res => {
              window.location.assign("/posts/"+this.state.postId);
              console.log(res.data);
            });
  
      }

      //toggle update view
      toggleClass() {
        let currentState = this.state.hideUpdateView;
        // let post = this.state.post;
        this.setState({ hideUpdateView: !currentState
         });
    };


    //Return to post index page after deleting post 

        reloadPosts (){     
          window.location.assign("/home");
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
  
        //handle change on update

        handleTitleChange(event){
          this.setState(
            {
              post: {
                title: event.target.title
              }
              
            }
        );
        }

        handleContentChange(event){
          this.setState(
            {
              post: {
                content: event.target.content
              }
              
            }
        );
        }

        loadPost(){
          axios.get('http://localhost:5000/api/posts/'+this.state.postId)
          .then(res => {
            this.setState({ post: res.data }, () => {
              console.log(this.get_author_name(this.state.post.userId));
            });
            // console.log(this.state);
          });
        }

        //get users full name

        get_author_name(userId){
          axios.get('http://localhost:5000/api/users/'+userId)
          .then(res => {
            this.setState({ author: res.data.firstName+ ' '+res.data.lastName});
            // return this.state.name;
          });
        }

        //formart the createdAt date for post

        format_date_created(createdAt_date){
          let date = new Date(createdAt_date);
          let human_readable_month = parseInt(date.getMonth()) + 1;
          return date.
          getFullYear()+'-'+
          human_readable_month+'-'+
          date.getDate();
        }
      
        componentDidMount() {
          const obj = getFromStorage('the_main_app');
          if (obj && obj.name) {
            const { name } = obj;
            this.setState({
              name,
            })
          }
        this.loadPost();
        
        setTimeout(this.get_author_name(this.state.post.userId));
        
      }
  render() {
    return (
      <div className="App">
      <div className="container">
        <div className="pushDown">
          <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}></AppNavbar>
       </div>
       
       <div className={!this.state.hideUpdateView ? 'd-none': null}>
        <div className="row justify-content-center">
          <div className="col-md-8">

      <Card className="pushDown">
        <CardBody>
            <CardTitle><small>{this.state.post.title}</small></CardTitle>
            <CardText>
              <p><small>By {(this.state.author.length>0)?(this.state.author):("Loading...")}</small></p>
              <p>{this.state.post.content}</p>
              <p><small>Posted {(this.state.post.createdAt)?(this.format_date_created(this.state.post.createdAt)):("Loading...")} </small></p>
            </CardText>
        </CardBody>
    </Card>
    <Comment></Comment>

    <div className="row justify-content-md-center">
    <div className="col-12 col-md-auto">
            
            <Link to="/home">
              <Button color="primary" rounded outline><i className="fa fa-angle-double-left leftMargin"></i>View all posts</Button>
            </Link>
         
            <Link to="#">
              <Button onClick={this.toggleClass} color="success" rounded outline><i className="fa fa-pencil leftMargin"></i>Update Post</Button>
            </Link>
            <Link to="#">
              <Button onClick={this.deletePost} color="danger" rounded outline><i className="fa fa-trash leftMargin"></i>Delete Post</Button>
            </Link>
    </div>
    </div>
          </div>
        </div>
       </div>

       
       <div className={this.state.hideUpdateView ? 'd-none': null} >
        <div className="card jumbotron-fluid pushDown">
          <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-6">
              <form  onSubmit={this.updatePost} noValidate>
                  {/* Title input */}
                  <Input label="Title" name="title" value={this.state.post.title} onChange={this.handleTitleChange} /> 

                  {/* Post content */}
                  <Input type="textarea" label="Content"  name="content" value={this.state.post.content} onChange={this.handleContentChange}/>
                  <div className="col-md-8">
                      <Button color="success" className="spaceBelow" type="submit">Save</Button>
                  </div>
              </form>
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
