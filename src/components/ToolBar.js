import React, { Component } from 'react';

class ToolBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentShirtColor: this.props.shirtFillColor
     }

 this.changeShirtColorHere = this.changeShirtColorHere.bind(this)
  }

changeShirtColorHere() {
    console.log("hola")
  }

  render () {
    return (
      <div className = 'toolbarContent'>
      <h1>Toolbar</h1>
      <div className = 'test-icon'>
      <i className='large material-icons'>insert_chart</i>
      </div>

      <div className = 'new-form'>
      
      
      </div>
    
      </div>

     
      
      
    )
  }
}

export default ToolBar