import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import Profile from './Profile';
import { MDBContainer } from 'mdbreact';
import { getFromStorage } from '../utils/storage'; 
import axios from 'axios';


class ProfileRead extends Component{
        constructor(props) {
        super(props);
        this.state = {
            name: '',
            user: {},
            userRole:'',
            avatar: ''
            
          
        };

        this.setName = this.setName.bind(this);
        this.getUser = this.getUser.bind(this);
        this.setRole = this.setRole.bind(this);
        this.getAvatar = this.getAvatar.bind(this);
        }


setName(){
    
        let obj = getFromStorage("the_main_app");
        if(obj && obj.name){
            this.setState({name: obj.name});
        }
}

getUser(){

    let obj = getFromStorage("the_main_app");
        if(obj && obj.userId){
            const { userId } = obj;
            axios.get(`http://localhost:5000/api/users/${userId}`)
                .then( res => {
                    const { role } = res.data;
                    this.setRole( role);
                    this.getAvatar( role);
                    this.setState({ user: res.data });
                    // console.log("Profile data: "+res.data)
                })
        }

}

getAvatar(role){

if(role === 1 || role === 2 ){
    let avatar = "../assets/avatar-teacher.png"
    this.setState({avatar}); 
} else {
    let avatar = "../assets/avatar.jpg"
    this.setState({avatar}); 
}
    
}

 setRole(role){
       
            
            if(role === parseInt(0)){
                this.setState({userRole: "Parent"}) 
            }
             if(role === parseInt(1)){
                this.setState({userRole: "Teacher"})
            }
             if(role === parseInt(2)){
                this.setState({userRole:"Administrator"})
            }
        }
    


componentDidMount(){
    this.setName();
    this.getUser();
  
}
    render(){


        return(
            <MDBContainer>
                <AppNavbar name={this.state.name}/>
                <Profile user={this.state.user} userRole={this.state.userRole} avatar={this.state.avatar}/>
                <AppFooter />
            </MDBContainer>
        )
    }
}

export default ProfileRead;