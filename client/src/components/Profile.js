import React, { Component } from 'react';
import '../Profile.css';
import parent_avatar from '../assets/avatar.jpg'
import teacher_avatar from '../assets/avatar-teacher.png'

class Profile extends Component{

    constructor(props) {
        super(props);

        this.state = {
            avatar:''
        }


 }

componentDidMount(){

    if(this.props.user.role === 0 ){
        this.setState({avatar: parent_avatar});
    } else {
        this.setState({avatar: teacher_avatar});
    }
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
                            <input className="form-control" type="text" defaultValue={this.props.user.firstName} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                            <input className="form-control" type="text" defaultValue={this.props.user.lastName} />
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
                            <input className="form-control" type="text" defaultValue={this.props.user.email} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Password:</label>
                            <div className="col-md-8">
                            <input className="form-control" type="password" defaultValue={11111122333} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Confirm password:</label>
                            <div className="col-md-8">
                            <input className="form-control" type="password" defaultValue={11111122333} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label" />
                            <div className="col-md-8">
                            <input type="button" className="btn btn-primary" defaultValue="Save Changes" />
                            <span />
                            <input type="reset" className="btn btn-default" defaultValue="Cancel" />
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





   