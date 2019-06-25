import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}

class ToolBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentShirtColor: this.props.shirtFillColor,
      logoText: '',
     }

 this.changeShirtColorHere = this.changeShirtColorHere.bind(this)
 this.changeLogo1ColorHere = this.changeLogo1ColorHere.bind(this)
 this.changeLogo2ColorHere = this.changeLogo2ColorHere.bind(this)

 this.handleLogoTextChange = this.handleLogoTextChange.bind(this)
 this.handleLogoTextSubmit = this.handleLogoTextSubmit.bind(this)

  }
 

  componentDidMount(){
    this.props.getColors()
    this.props.getLogos()
    }


    handleLogoTextChange(event) {
      this.setState({ [event.currentTarget.id]: event.currentTarget.value})
      console.log(event.currentTarget.value)
  }

  handleLogoTextSubmit(event) {
  event.preventDefault();

  this.props.handleLogoTextSubmitApp(this.state.logoText)
  this.setState({logoText: ''})
  
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


 <h6>Shirt</h6>
<div className='row choice-row'>

      {this.props.colors.map((item, index) => {
  return (
    
    <div className = 'shirt-color col' key = {item._id} index = {index} onClick={() => { 
      this.changeShirtColorHere(item) }} >
    <img src = {this.props.colors[index].swatch}></img> </div>

        )  
})}
</div>
{/*  
<div className='deleteColor' onClick={() => { this.props.deleteColor(item.id) }}> <i className="small material-icons"><div className = "edit-delete-icon">delete</div></i>
                                </div> */}

{/* // 
// <div className='deleteLogo' onClick={() => { this.props.deleteLogo(item.id) }}><i className="small material-icons"><div className = "edit-delete-icon  ">delete</div></i>
// </div> */}



<h6>Logos</h6>
<div className='row choice-row'>
      {this.props.logos.map((item, index) => {
  return (
  
    <div className = 'logo-choice' key = {item._id} index = {index} ><div>
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.props.changeCurrentLogo(item) }}></img></div></div> </div>


                                

     
        )
  
})}




</div>
<form className = 'logoTextSection col s12 m12 l12' onSubmit={this.handleLogoTextSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
    
                <input className = 'col s6 m6 l6' type="text" id="logoText" name="logoText" onChange={this.handleLogoTextChange} value={this.state.logoText}  />  
                
                <div className = 'addLogoTextSubmit col s2 m2 l2'>
                <input type="submit" value="Add Logo Text"/>
                </div>

                </div>   
                </div>

              
             
            </form>
            

            <h6 className = 'logoTextColorSection'>LogoTextColor</h6>
<div className='row choice-row'>

      {this.props.logoTextColor.map((item, index) => {
  return (
    
    <div className = 'logoTextColor-choice col' key = {item._id} index = {index} onClick={() => { 
      this.props.changeCurrentLogoTextColor(item) }} ><div className = 'logoTextColor col' style={{backgroundColor: item}} onClick={() => { this.props.changeCurrentLogoTextColor(item) }}>
   &nbsp;</div> </div>

        )  
})}
</div>



<h6 className = 'fontSection'>Fonts</h6>
<div className='row choice-row'>
      {this.props.fonts.map((item, index) => {
  return (

    
  
    <div className = 'font-choice' key = {item._id} index = {index} ><div>
    <div className = 'font-image'><p onClick={() => { this.props.changeCurrentFont(item) }}><span style={{fontFamily: item}}>{item}</span></p></div></div> </div>


                                

     
        )
  
})}




</div>
      
      </div>

 

     
      
      
    )
  }
}

export default ToolBar