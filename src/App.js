import React, { Component } from 'react';
import First from './components/First.js'
import ToolBar from './components/ToolBar.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shirtFillColor: 'pink',
      shirtStrokeColor: 'purple',
      logo1FillColor: 'yellow',
      logo2FillColor: 'red',
      logo1TextColor: 'white',
      logo2TextColor: 'green',
    }
  }

  render() {
    fetch('/users/1')                                        
    .then(response => response.json())                                            
    .then(json => console.log(json))   
  
    .catch(err => console.log(err))
    return (
      <div className="app row">
      <div className = 'first col'>
        <First shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor} logo1TextColor={this.state.logo1TextColor} logo2TextColor={this.state.logo2TextColor} shirtStrokeColor={this.state.shirtStrokeColor}/>
        </div>
        <div className = 'toolbar col'>
        <ToolBar />
        </div>

      </div>
    );
  }
}

export default App;