import React, { Component } from 'react';
import { Navbar, 
         NavbarBrand, 
         NavbarNav, 
         NavbarToggler, 
         Collapse, 
         NavItem, 
         NavLink, 
         Dropdown, 
         DropdownToggle, 
         DropdownMenu, 
         DropdownItem,
         MDBIcon } from 'mdbreact';
import { getFromStorage, clearStorage } from '../utils/storage';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    redirectToLogin(){
        return <Redirect to="/accounts/login" />
    }
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    logout() {
        this.setState({
          isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          axios.get('http://localhost:5000/api/users/account/logout?token=' + token)
            .then(res => res.data)
            .then(res => {
              if (res.success) {
                this.setState({
                  token: '',
                  name: '',
                  isLoading: false
                });

                //clear storage & destory current session
                clearStorage();
                
                // this.redirectToLogin();
              } else {
                this.setState({
                  isLoading: false,
                });
              }
            });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      }

    render() {
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/" onClick={ <Redirect to="/" /> }>
                        <strong>PTAjoint</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                          <NavItem active>
                              <NavLink to="/home" onClick={ <Redirect to="/home" />} >Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/calendar" onClick={ <Redirect to="/calendar" />} >Calendar</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/staff" onClick={ <Redirect to="/staff" />} >Staff</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/groups" onClick={ <Redirect to="/groups" />} >Groups</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/files" onClick={ <Redirect to="/files" />} >Files</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/announcements" onClick={ <Redirect to="/announcements" />} > Announcements</NavLink>
                          </NavItem>
                          <NavItem>
                            <Dropdown>
                            {
                                ((this.props.name)) ? (
                                <div>
                                    <DropdownToggle nav caret>{this.props.name}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem> 
                                        <Link to="/accounts/login" onClick={ <Redirect to="/accounts/login" /> }><span className="mr-1"><MDBIcon icon="sign-out" /></span>Logout</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                        <Link to="/profile" onClick={ <Redirect to="/profile" />} > <span className="mr-1"><MDBIcon icon="gear" /></span>Profile</Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </div>
                                ) : (
                                    <div>
                                        <NavItem>
                                            <NavLink to="/accounts/login"  onClick={ <Redirect to="/accounts/login" />}>
                                                 Login
                                            </NavLink>
                                        </NavItem>
                                    </div>
                                )
                            }
                                
                                
                            </Dropdown>
                          </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                          <NavItem>
                            <form className="form-inline md-form mt-0">
                              <input className="form-control mr-sm-2 mb-0 text-white" type="text" placeholder="Search" aria-label="Search"/>
                            </form>
                          </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </Router>
        );
    }
}

export default AppNavbar;