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

            
                    <tr>
                    <td>{this.props.userKey+1}</td>
                    <td>{this.props.user.firstName}</td>
                    <td>{this.props.user.lastName}</td>
                    <td><a href={'mailto:'+this.props.user.email} className="blue-text">{this.props.user.email}</a></td>
                    <td>{this.getRole(this.props.user.role)}</td>
                    </tr>


        )
    }
}

 export default Staff;

   