import React, { Component } from 'react';
import '../Profile.css';
import parent_avatar from '../assets/avatar.jpg'
import teacher_avatar from '../assets/avatar-teacher.png'
import axios from 'axios';
import { getFromStorage, setInStorage } from '../utils/storage';

class Profile extends Component{

    constructor(props) {
        super(props);
     

        this.state = {
            avatar:'',
            firstName: '',
            lastName:'',
            email:'',
            oldPassword:'',
            userId:'',
            password: '',
            confirmPassword:''
        }

        this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
        this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
        this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
        this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
        this.onTextboxChangeConfirmPassword = this.onTextboxChangeConfirmPassword.bind(this);
        this.getUser = this.getUser.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.reloadProfile = this.reloadProfile.bind(this);
        this.setDefaullts = this.setDefaullts.bind(this);



 }

componentDidMount(){

    if(this.props.user.role === 0 ){
        this.setState({avatar: parent_avatar});
    } else {
        this.setState({avatar: teacher_avatar});
    }
    this.getUser();
    // this.setDefaullts();
}

setDefaullts(){
    let { 
        firstName,
        lastName,
        email
    } = this.props.user;

    this.setState({firstName, lastName, email});
}
submitHandler(event){
    
    event.preventDefault();

    let {

        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        
      } = this.state;
  
  
      if (firstName.trim()==null || firstName.trim()==""|| firstName===" ") {
          alert("First name must be filled out");
          return false;
      }
     
      if (lastName.trim()==null || lastName.trim()==""|| lastName===" ") {
          alert("last name must be filled out");
          return false;
      }
        if (email.trim()==null || email.trim()==""|| email===" ") {
          alert("Email must be filled out");
          return false;
      }
      
       
      
  
      // Persist newly created user
  
      this.setState({
        isLoading: true,
      });
  
       axios
      .put(`http://localhost:5000/api/users/account/update_profile/${this.state.userId}`, {
            firstName,
            lastName,
            email,

          })
        .then(res => res.data)
        .then(res => {
  
          if(res.success){
            setInStorage('the_main_app', { name: res.user.firstName+' '+res.user.lastName, userId: res.user._id  });
            this.setState({ 
                firstName,
                lastName,
                email,
              
            })
            this.setState({ isLoading: false})
            this.reloadProfile();
            //  console.log(this.state);
            
                }
              })
          }

          onTextboxChangeFirstName(event) {
            this.setState({
              firstName: event.target.value,
            });
          }
  
          onTextboxChangeLastName(event) {
            this.setState({
              lastName: event.target.value,
            });
          }
  
          onTextboxChangePassword(event) {
            this.setState({
              password: event.target.value,
            });
          }
  
          onTextboxChangeConfirmPassword(event) {
            this.setState({
             confirmPassword : event.target.value,
            });
          }
          
  
          onTextboxChangeEmail(event) {
            this.setState({
              email: event.target.value,
            });
          }

          getUser(){

            if(getFromStorage("the_main_app")){
                 const { userId } = getFromStorage("the_main_app");
                 this.setState({userId})
            }
    
        }

        reloadProfile(){
            window.location.reload();
        }


    render(){

        return(
         <div  className="container mt-4">
                <div className="container">
                    <h1  className="text-center">Edit Profile</h1>
                    <hr />
                    <div className="row">
                    {/* left column */}
                    <div className="col-md-3">
                        <div className="text-center">
                        <img src={this.state.avatar} className="avatar img-fluid  img-circle" alt="avatar" />
                        </div>
                    </div>
                    {/* edit form column */}
                    <div className="col-md-9 personal-info">
                        <div className="alert alert-info col-lg-8 alert-dismissable">
                        <a className="panel-close close" data-dismiss="alert">×</a> 
                        <i className="fa fa-coffee mr-2"/>
                        This is will be used this to show important messages to the user.
                        </div>
                        <h3>Personal info</h3>
                        <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                            <input className="form-control" type="text" defaultValue={this.props.user.firstName} name="firstName"   onChange={this.onTextboxChangeFirstName} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                            <input className="form-control" type="text" defaultValue={this.props.user.lastName} name="lastName" onChange={this.onTextboxChangeLastName}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Role:</label>
                            <div className="col-lg-8">
                            <input className="form-control" type="text" defaultValue={this.props.userRole} readonly/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Email:</label>
                            <div className="col-lg-8">
                            <input className="form-control" type="text" defaultValue={this.props.user.email} name="email" onChange={this.onTextboxChangeEmail}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Password:</label>
                            <div className="col-md-8">
                            <input className="form-control" type="password"  />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Confirm password:</label>
                            <div className="col-md-8">
                            <input className="form-control" type="password"  />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label" />
                            <div className="col-md-8">
                            <input type="button" className="btn btn-primary" value="Save Changes" onClick={this.submitHandler} />
                            <span />
                            <input type="reset" className="btn btn-default" value="Cancel" />
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                <hr />
            </div>

        )
    }
}

export default Profile;





   