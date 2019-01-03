import React, { Component } from 'react';
import '../Staff.css';
import teacher_avatar from '../assets/avatar-teacher.png';

class Staff extends Component {

    constructor(props) {
        super(props);


        this.getRole = this.getRole.bind(this);
      }

        getRole(role){

            if(role===1){
                return 'Teacher';
            } else if(role==2){
                return 'Administrator'
            }

        }
     




    render () {

        return(

            <div className="container">
                    <title>Profile</title>
                    <link href="https://fonts.googleapis.com/css?family=Pathway+Gothic+One" rel="stylesheet" type="text/css" />
                    <div className="staff-container">
                        
                        <div className="cover">
                        <div className="avatar">
                            <img src={teacher_avatar} width={300} />
                            <div className="light">
                            </div>
                        </div>
                        </div>
                        <div className="main">
                        <p><h1>{this.props.user.firstName} {this.props.user.lastName}</h1></p>
                        <h6>{this.props.user.email}</h6>
                        <br />
                        <p><h5>{this.getRole(this.props.user.role)}</h5></p>
                        <p>Some short bio about this user here.</p>
                        </div>
                    </div>
            </div>

        )
    }
}

 export default Staff;