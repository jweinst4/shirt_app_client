import React, { Component } from 'react';
import First from './components/First.js'
import './App.css';

class App extends Component {


  render() {
    fetch('/users/1')                                        
    .then(response => response.json())                                            
    .then(json => console.log(json))   
  
    .catch(err => console.log(err))
    return (
      <div className="App">
        <First />
      </div>
    );
  }
}

export default App;