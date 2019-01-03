import React, { Component } from 'react';
import { MDBContainer, Row } from 'mdbreact';
import axios from 'axios';
import '../Comment.css';
import parent_avatar from '../assets/avatar.jpg'

class Comment extends Component{

    constructor(props) {
        super(props);
    }

 




    render(){

        return(
            <MDBContainer>
            <Row>
                <div className="col-md-1 mt-3">
                <span> <img src={parent_avatar} className="avatar img-fluid  img-circle" alt="avatar" /></span>
                   {this.props.comment.name}
                </div>
                <div className="col-md-10">
                    <div className="triangle-border">
                        <span className="vertical-ellipsis">{this.props.comment.content}</span>
                    </div>
                    
                </div>
            </Row>

            </MDBContainer>



        )
    }
}

export default Comment;