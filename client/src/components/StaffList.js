import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import { getFromStorage } from '../utils/storage';
import Staff from './Staff';
import Spinner from './Spinner';
import axios from 'axios';


class StaffList extends Component {




    constructor(props) {
        super(props);
        this.state = {
          staff: [],
          name:"",
          isLoading: false,

        };

        // Get staff members

        this.getStaffMembers = this.getStaffMembers.bind(this);
        this.getUser = this.getUser.bind(this);
        
      }


      getStaffMembers(){

        this.setState({ isLoading: true});

         axios.get('http://localhost:5000/api/users/staff')
         .then(res => {

            let staff = []
            res.data.map((user,i) =>{
                if(user.role && user.role !=0){
                    staff.push(user);
                }
              })
           this.setState({ staff, isLoading: false });
           
         })
         .catch(err =>{
             console.log('Error getting staff members: '+err)
         });
       }

       getUser(){

        if(getFromStorage("the_main_app")){
             const { name } = getFromStorage("the_main_app");
             this.setState({name})
        }
    }

       componentDidMount(){

        this.getStaffMembers();

        //Retrieve the currently logged in user
                this.getUser();
       }

    render () {

        const {staff, isLoading} = this.state;

        if(isLoading){

            return <Spinner></Spinner>;
        }
        return(

            <div className="container">
            <AppNavbar name={(this.state.name.length>0)?(this.state.name):('')}/>
                {
                    staff.map((user,i) =>
                    <Staff user={user} key={i}></Staff>
                )
                }
             <AppFooter />
            </div>

        )
    }
}

 export default StaffList;