import React, { Component } from 'react';
import { MDBCard, 
    MDBCardBody, 
    MDBCol, 
    MDBRow, 
    MDBContainer,
    MDBCardHeader,
    Button,
    MDBIcon 
} from "mdbreact";

import { getFromStorage, SaveDataToLocalStorage } from '../utils/storage';
import { Redirect } from 'react-router';

class Group extends Component {


    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          currentUserId:"",
          userId:"",
          redirect: false,
          groups: []
        };
        this.get_random_color = this.get_random_color.bind(this);
        this.check_if_user_is_already_a_member = this.check_if_user_is_already_a_member.bind(this);
        this.view_group_posts = this.view_group_posts.bind(this, this.props.group._id);
        this.getUserId = this.getUserId.bind(this);
      }

    get_random_color(){
          let colors = ['indigo', 'secondary-color-dark','default-color-dark',' deep-purple darken-1', 'pink lighten-2', 'info-color', 'red lighten-1', 'success-color', 'mdb-color lighten-2'];
          let random_color = colors[Math.floor(Math.random() * colors.length)];
          return random_color;
           
    }

    getUserId() {

      const obj = getFromStorage('the_main_app');
      if(obj && obj.userId){
        let {userId} = obj;
        this.setState({userId});
      }
      
    }

    check_if_user_is_already_a_member(userId, groupMembers){
      return groupMembers.indexOf(userId) > -1;
    }

    view_group_posts(groupId){

      SaveDataToLocalStorage("the_main_app", groupId);

      if(getFromStorage("the_main_app")){

        let obj = getFromStorage("the_main_app");

        if(obj.groupId){
          console.log("Viewing posts for: "+obj.groupId)
          this.setState({redirect: true}); 
        } else {
          console.error("No group ID found!");
        }
      }
      

    }

    componentDidMount(){
      this.getUserId();
    }
    
    render(){
      
        if(this.state.redirect){
        return <Redirect to="/group_posts" />;
      }
    
        return (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="8"  className="mb-4 offset-md-2">
                  <MDBCard color={this.get_random_color()} text="white" className="text-center mb-4">
                  <MDBCardHeader>
                      {this.props.group.name}
                  </MDBCardHeader>
                    <MDBCardBody>
                      {this.props.group.description}
                      <p>
                      <Button color='primary' 
                        onClick={this.view_group_posts}>{
                        (this.check_if_user_is_already_a_member(this.state.userId, this.props.group.members))?
                        (<span> <MDBIcon className="mr-2"  icon="folder-open"  /> View posts</span> ):(<span> <MDBIcon className="mr-2" icon=" fa-angle-double-right" />Join Group</span>)
                      }</Button>
                      </p>
                    </MDBCardBody>
                  </MDBCard>            
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            );
            };
    }

export default Group;