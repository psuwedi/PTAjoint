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

import { getFromStorage } from '../utils/storage';

class Groups extends Component {


    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          currentUserId:"",
          groups: []
        };
        this.get_random_color = this.get_random_color.bind(this);
        this.check_if_user_is_already_a_member = this.check_if_user_is_already_a_member.bind(this);
      }

    get_random_color(){
          let colors = ['indigo', 'secondary-color-dark','default-color-dark',' deep-purple darken-1', 'pink lighten-2', 'info-color', 'red lighten-1', 'success-color', 'mdb-color lighten-2'];
          let random_color = colors[Math.floor(Math.random() * colors.length)];
          return random_color;
           
    }

    check_if_user_is_already_a_member(userId, groupMembers){
      return groupMembers.indexOf(userId) > -1;
    }
    
    render(){

        return (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <MDBCard color={this.get_random_color()} text="white" className="text-center mb-4">
                  <MDBCardHeader>
                      {this.props.group.name}
                  </MDBCardHeader>
                    <MDBCardBody>
                      {this.props.group.description}
                      <p>
                      <Button color='primary'>{
                        (this.check_if_user_is_already_a_member(getFromStorage('the_main_app').userId, this.props.group.members))?
                        (<span><MDBIcon icon="folder-open" /> View posts</span> ):("Join Group")
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

export default Groups;