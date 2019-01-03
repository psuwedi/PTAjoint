import React, { Component } from 'react';
import { Button, Input, FormInline } from 'mdbreact';
import Spinner from './Spinner';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import axios from 'axios';
import {
    getFromStorage,
  } from '../utils/storage';


class CreateComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            content:'',

        }

        this.submitHandler = this.submitHandler.bind(this);
        this.reloadPost = this.reloadPost.bind(this);
       
        
    }

    //push newly created comment to the top 

    reloadPost (){
        window.location.reload();
    }




      submitHandler = (event) => {
        event.preventDefault();

       
        let content = event.target.content.value;
       
        if (content.trim()==null || content.trim()==""|| content===" ") {
            alert("Content must be filled out");
            return false;
        }

      
   
        this.setState({ content})
        
        let comment =  {
            content,
            userId: this.state.userId,
            name: this.props.name
        }

        let comments = [...this.props.post.comments, comment]

        // Save post to DB
        axios
        .put(`http://localhost:5000/api/posts/${this.props.post._id}/comment`, {  
                comments,
            })
          .then(res => {
              this.reloadPost();
            console.log(res.data);
          });
        }



        componentDidMount() {
            const obj = getFromStorage('the_main_app');
            if (obj && obj.userId) {
              const { userId } = obj;
              this.setState({
                userId
              })
            }

          }
      

  render() {
    return (


      <div className="card jumbotron-fluid pushDown">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            
            <form  onSubmit={this.submitHandler} noValidate>
               
                {/* Post content */}
                <Input type="textarea" label="Comment"  name="content" placeholder="Type your comment.."/>
                
                <div className="col-md-8 offset-md-4">
                    <Button color="success" className="spaceBelow changeColor" type="submit"> post comment</Button>
                </div>
            </form>
            </div>
            
        </div>
        </div>
         </div> 

    );
  }
}

export default CreateComment;
