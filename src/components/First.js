import React, { Component } from 'react';
import Canvas from './Canvas.js';

class First extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentShirtColor: this.props.shirtFillColor
     }
     this.changeShirtColorHere = this.changeShirtColorHere.bind(this)

 
  }

  changeShirtColorHere(item) {
    
    this.props.changeShirtColor(item);
    

  }


  render () {
    return (
    
      <div className = 'firstContent'>
       
 <Canvas shirtFillColor={this.props.shirtFillColor} colors={this.props.colors} shirtStrokeColor={this.props.shirtStrokeColor} currentLogo={this.props.currentLogo}/>
                           
        </div>







        
 
    )
  }
}

export default First