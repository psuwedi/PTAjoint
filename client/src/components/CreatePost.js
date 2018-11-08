import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import axios from 'axios';



class CreatePost extends Component {


    state = {
          title:'',
          content:''
      }
    

      submitHandler = (event) => {
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
        .post('http://localhost:5000/api/posts/', {
                title,
                content
            })
          .then(res => {
            console.log(res.data);
          });
       
            // return this.setState({...this.state, [event.target.name]: event.target.value})
        }
      
    
    //   changeHandler = (event) => {
    //     this.setState({...this.state, [event.target.name]: event.target.value})
    //   }


  render() {
    return (
      <div className="create">

      <div className="jumbotron jumbotron-fluid pushDown">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <form  onSubmit={this.submitHandler} noValidate>
                {/* Title input */}
                <Input label="Title" name="title" /> 

                {/* Post content */}
                <Input type="textarea" label="Content"  name="content"/>
                <div className="col-md-8">
                    <Button color="success" className="spaceBelow" type="submit">Create Post</Button>
                </div>
            </form>
            </div>
            
        </div>
        </div>
    </div>

        
       
      </div>
    );
  }
}

export default CreatePost;
