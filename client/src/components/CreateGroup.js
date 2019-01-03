import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
import axios from 'axios';



class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group_name:'',
            description:''
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.reloadGroups = this.reloadGroups.bind(this);
       
        
    }

    //push newly created group to the top 

    reloadGroups (){
        window.location.reload();
    }




      submitHandler = (event) => {
        event.preventDefault();

       
        let group_name = event.target.group_name.value;
        let description = event.target.description.value;


        if (group_name.trim()==null || group_name.trim()==""|| group_name===" ") {
            alert("Group name must be filled out");
            return false;
        }
       
        if (description.trim()==null || description.trim()==""|| description===" ") {
            alert("Description must be filled out");
            return false;
        }

      
   
        this.setState({ group_name, description})

        // Save post to DB
        axios
        .post(`http://localhost:5000/api/groups/`, {  
                name: group_name,
                description
            })
          .then(res => {
              this.reloadGroups();
            console.log(res.data);
          });
        }


  render() {
    return (


      <div className="card jumbotron-fluid pushDown mb-4">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            
            <form  onSubmit={this.submitHandler} noValidate>

                {/* Name input */}
                <Input label="Name" name="group_name" /> 

               
                {/* Group description */}
                <Input type="textarea" label="Description"  name="description" placeholder="What is this group all about?"/>
                
                <div className="col-md-8 offset-md-4">
                    <Button color="success" className="spaceBelow changeColor" type="submit"> Create group</Button>
                </div>
            </form>
            </div>
            
        </div>
        </div>
         </div> 

    );
  }
}

export default CreateGroup;
