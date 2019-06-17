import React, { Component } from 'react';
import Canvas from './Canvas.js';

class First extends Component {
  render () {
    return (
    
      <div className = 'firstContent'>
        <h1>First</h1>
        <Canvas shirtFillColor={this.props.shirtFillColor} logo1FillColor={this.props.logo1FillColor} logo2FillColor={this.props.logo2FillColor} logo1TextColor={this.props.logo1TextColor} logo2TextColor={this.props.logo2TextColor} shirtStrokeColor={this.props.shirtStrokeColor}/>
        </div>

        
        
 
    )
  }
}

export default First