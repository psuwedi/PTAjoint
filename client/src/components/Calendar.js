import React, { Component } from 'react';
import EventCalendar from 'react-event-calendar';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import { MDBContainer } from 'mdbreact';
import { getFromStorage } from '../utils/storage';
import "react-event-calendar/style.css";

class Calendar extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            name: '',
             events: [
        {
            start: '2018-11-22',
            end: '2018-11-22',
            eventClasses: 'optionalEvent',
            title: 'Opening day',
            description: 'This is a test description of an event',
        },
        {
            start: '2018-11-28',
            end: '2018-11-28',
            title: 'End of year exams',
            description: 'This is a test description of an event',
            data: 'you can add what ever random data you may want to use later',
        },
    ]
        };

        this.getUser = this.getUser.bind(this);
      
      }


    getUser(){

        if(getFromStorage("the_main_app")){
             const { name } = getFromStorage("the_main_app");
             this.setState({name})
        }

    }

    componentDidMount(){
        this.getUser();
    }
    
   

    render(){
        return(
            <MDBContainer className="mb-4">
                <AppNavbar name={this.state.name}></AppNavbar>
             <EventCalendar 
                className="mt-4"
                month={10}
                year={2018}
                events={this.state.events} 
                onEventClick={(target, eventData, day) => console.log(eventData)} 
                /> 
                <AppFooter></AppFooter>
            </MDBContainer>
        );
    

}}

export default Calendar;

