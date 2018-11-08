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
         DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
    this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    render() {
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>PTAjoint</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                          <NavItem active>
                              <NavLink to="#">Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Posts</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Announcements</NavLink>
                          </NavItem>
                          <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>Tasks</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#">Login</DropdownItem>
                                    <DropdownItem href="#">Join Group</DropdownItem>
                                    <DropdownItem href="#">Settngs</DropdownItem>
                                    <DropdownItem href="#">About</DropdownItem>
                                </DropdownMenu>
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