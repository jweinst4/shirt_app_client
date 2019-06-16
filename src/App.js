import React, { Component } from 'react';
import First from './components/First.js'
import ToolBar from './components/ToolBar.js'
import './App.css';

class App extends Component {


  render() {
    fetch('/users/1')                                        
    .then(response => response.json())                                            
    .then(json => console.log(json))   
  
    .catch(err => console.log(err))
    return (
      <div className="app row">
      <div className = 'first col'>
        <First />
        </div>
        <div className = 'toolbar col'>
        <ToolBar />
        </div>
      </div>
    );
  }
}

export default App;