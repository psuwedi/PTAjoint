import React, { Component } from 'react';
import Group from './Group';
import AppNavbar from './AppNavbar'
import AppFooter from './AppFooter';
import axios from 'axios';
import '../App.css';
import { getFromStorage } from '../utils/storage';

class Groups extends Component {


    constructor(props) {
        super(props);
        this.state = {
          name: '',
          isLoading: true,
          groups: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){
        axios.get('http://localhost:5000/api/groups')
        .then(res => {
          this.setState({ groups: res.data, isLoding: false });
          console.log(this.state.groups);
        });
      }

      componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.name) {
          const { name } = obj;
          this.setState({
            name,
          })
        }

        this.loadData()
        
    }

    render(){

        return (
            <div className="App">
            <div className="container">
                <AppNavbar  name={(this.state.name.length>0)?(this.state.name):('')}/>
            <div className="pushDown">
            <React.Fragment>	
				{this.state.groups.map((group, i) =>
					<Group group = {group} key={i} ></Group>
				)}
			</React.Fragment>
            </div>  
                <AppFooter></AppFooter>
            </div>
            </div>
            );
          };
    }

export default Groups;



