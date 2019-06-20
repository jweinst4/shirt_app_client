import React, { Component } from 'react';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}

class ToolBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentShirtColor: this.props.shirtFillColor
     }

 this.changeShirtColorHere = this.changeShirtColorHere.bind(this)
 this.changeLogo1ColorHere = this.changeLogo1ColorHere.bind(this)
 this.changeLogo2ColorHere = this.changeLogo2ColorHere.bind(this)

  }


  componentDidMount(){
    this.props.getColors()
    }


changeShirtColorHere(item) {
  this.props.changeShirtColor(item);
  }



  changeLogo1ColorHere(item) {
    this.props.changeLogo1Color(item);
    }

    changeLogo2ColorHere(item) {
      this.props.changeLogo2Color(item);
      }

  render () {
    return (
      <div className = 'toolbar-content'>
 
 <h4> Note: add text box, add resize option to everything, redo shirt outline, discuss doing canvas shirt vs. real tshirt image (wont be able to adjust shirt color, but can have an actual image for however many colored shirts there are), auth login, look into automatic background removal pricing options.</h4>

 <h4>Shirt Color (140 available colors)</h4>
<div className='row choice-row'>

      {this.props.colors.map((item, index) => {
  return (
    
    <div className = 'shirt-choice col' key = {item._id} index = {index} onClick={() => { 
      this.changeShirtColorHere(item) }} ><div className = 'col shirt-color' style={{backgroundColor: item.name}}>
    &nbsp;</div><div className='deleteColor' onClick={() => { this.props.deleteColor(item.id) }}> <i className="small material-icons"><div className = "edit-delete-icon  ">delete</div></i>
                                </div> </div>
 

    
     
        )
  
})}
</div>

<h4>Logos (draggable, also need to buy server space if saving logos, otherwise they have to post the logo on a sitel like imgur, etc.)</h4>
<div className='row choice-row'>
      {this.props.logos.map((item, index) => {
  return (
  
    <div className = 'logo-choice' key = {item._id} index = {index} ><div>
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.props.changeCurrentLogo(item) }}></img></div></div> <div className='deleteLogo' onClick={() => { this.props.deleteLogo(item.id) }}><i className="small material-icons"><div className = "edit-delete-icon  ">delete</div></i>
                                </div> </div>

     
        )
  
})}
</div>
      
      </div>

 

     
      
      
    )
  }
}

export default ToolBar