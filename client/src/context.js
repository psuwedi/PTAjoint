import React, { Component } from 'react';

const Context = React.createContext();

class App extends Component {

    state = {
        posts = []
    }
  render() {
    return (
     <Context.Provider>
         {this.props.children}
     </Context.Provider>
    );

  }
}


export default App;