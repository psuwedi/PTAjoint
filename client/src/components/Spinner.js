import React, { Component } from 'react';
import spinner from '../assets/spinner.gif';


class Spinner extends Component {

    render(){

        return(
            <div className="spinner">
               
            <img
                src={spinner}
                alt="Loading..."
                style={{ width: '200px', margin: ' 40px auto', display: 'block' }}
            />
            </div>
        );
    }
}


export default Spinner;