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


class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            title:'',
            content:'',
            hideCreateForm: false,
            groups: [],
            tags: []
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.reloadPosts = this.reloadPosts.bind(this);
        this.displayOrHideForm = this.displayOrHideForm.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        
    }

    //push newly created post to the top 

    reloadPosts (){
        window.location.reload();
    }

    getGroups(){

       
        const obj = getFromStorage('the_main_app');
        axios
        .get('http://localhost:5000/api/groups/')
        .then(res =>{

            // Only allow admins and teachers to post announcements
            if(!obj || obj.role !=2 || obj.role !=1){
                res.data.map((group, i) => {
                    if(group._id === "5c274dc9abeaa32ba09ce3ed"){
                        res.data.splice(i,1);
                    }
 
                })
            }
            this.setState({groups: res.data});
        })
    }

    displayOrHideForm(){

        const obj = getFromStorage('the_main_app');

        if(!obj){
            this.setState({hideCreateForm: true})
        }
        
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
                content,
                tags: this.state.tags,
                userId: this.state.userId
            })
          .then(res => {
              this.reloadPosts();
            console.log(res.data);
          });
        }
        handleTagsChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            if(value){
            const tag = target.id;
            let currentTags = [...this.state.tags, tag];
            this.setState({ tags: currentTags })
            }

            console.log(this.state);
        }

        componentDidMount() {
            const obj = getFromStorage('the_main_app');
            if (obj && obj.userId) {
              const { userId } = obj;
              this.setState({
                userId
              })
            }

            this.displayOrHideForm();
            this.getGroups();
          }
      

  render() {
    return (
      <div className={this.state.hideCreateForm ? 'd-none': null}>

      <div className="card jumbotron-fluid pushDown">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            
            <form  onSubmit={this.submitHandler} noValidate>
                {/* Title input */}
                <Input label="Title" name="title" /> 

                {/* Post content */}
                <Input type="textarea" label="Content"  name="content"/>
                
                <div className="selectGroup">
                <FormInline className="panel">
                {this.state.groups.map((group, i) =>
                    
                    <Input label={group.name} onChange={this.handleTagsChange} type="checkbox" id={group._id} key = {i}/>
                )}
                </FormInline>
                </div>
                
                <div className="col-md-8 offset-md-4">
                    <Button color="success" className="spaceBelow changeColor" type="submit">Create Post</Button>
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
