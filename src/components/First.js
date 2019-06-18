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
    console.log(item)
    this.props.changeShirtColor(item);
    

  }


  render () {
    return (
    
      <div className = 'firstContent'>




      
       


        
                              
 <Canvas shirtFillColor={this.props.shirtFillColor} logo1FillColor={this.props.logo1FillColor} logo2FillColor={this.props.logo2FillColor} logo1TextColor={this.props.logo1TextColor} logo2TextColor={this.props.logo2TextColor} shirtStrokeColor={this.props.shirtStrokeColor}/>
                           
        </div>







        
 
    )
  }
}

export default First