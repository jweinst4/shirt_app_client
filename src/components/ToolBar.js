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
 this.changeLogoURLHere = this.changeLogoURLHere.bind(this)
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

      changeLogoURLHere(item) {
        this.props.changeLogoURL(item);
        }

  render () {
    return (
      <div className = 'toolbar-content'>
 

 <h4>Shirt Color</h4>
<div className='row choice-row'>

      {this.props.colors.map((item, index) => {
  return (
    
    <div className = 'shirt-choice col' key = {item._id} index = {index} onClick={() => { 
      this.changeShirtColorHere(item) }} ><div className = 'col shirt-color' style={{backgroundColor: item.name}}>
    &nbsp;</div><div className='deleteColor' onClick={() => { this.props.deleteColor(item.id) }}><div className = "valign-wrapper"> <i className="small material-icons"><div className = "edit-delete-icon  ">delete</div></i></div>
                                </div> </div>
 

    
     
        )
  
})}

</div>

<h4>Logo1 Color</h4>
<div className='row choice-row'>
      {this.props.logoFillColors.map((item, index) => {
  return (
  
    <div className = 'logo1-choice' key = {item._id} index = {index} onClick={() => { 
      this.changeLogo1ColorHere(item) }} ><div className = 'col logo1-color' style={{backgroundColor: item}}>
      &nbsp;</div> </div>
 

    
     
        )
  
})}
</div>

<h4>Logo2 Color</h4>
<div className='row choice-row'>
      {this.props.logoFillColors.map((item, index) => {
  return (
  
    <div className = 'logo2-choice' key = {item._id} index = {index} onClick={() => { 
      this.changeLogo2ColorHere(item) }} ><div className = 'col logo2-color' style={{backgroundColor: item}}>
    &nbsp;</div> </div>
     
        )
  
})}
</div>

{this.props.logos.map((item, index) => {
  return (
    
    <div key = {item._id} index = {index} >
   
    <p>{item.name}</p></div>
 

    
     
        )
  
})}
      
      </div>

 

     
      
      
    )
  }
}

export default ToolBar