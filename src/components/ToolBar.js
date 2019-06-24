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


 <h4>Shirt</h4>
<div className='row choice-row'>

      {this.props.colors.map((item, index) => {
  return (
    
    <div className = 'shirt-choice col' key = {item._id} index = {index} onClick={() => { 
      this.changeShirtColorHere(item) }} ><div className = 'col shirt-color'>
    <img src = {this.props.colors[index].name}></img></div> </div>

        )  
})}
</div>

{/* <div className='deleteColor' onClick={() => { this.props.deleteColor(item.id) }}> <i className="small material-icons"><div className = "edit-delete-icon">delete</div></i>
                                </div> */}

{/* // 
// <div className='deleteLogo' onClick={() => { this.props.deleteLogo(item.id) }}><i className="small material-icons"><div className = "edit-delete-icon  ">delete</div></i>
// </div> */}

<h4>Logos</h4>
<div className='row choice-row'>
      {this.props.logos.map((item, index) => {
  return (
  
    <div className = 'logo-choice' key = {item._id} index = {index} ><div>
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.props.changeCurrentLogo(item) }}></img></div></div> </div>


                                

     
        )
  
})}




</div>
<h4>LogoText:</h4>
<form className = 'col s12 m12 l12' onSubmit={this.handleLogoTextSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
    
                <input className = 'col s10 m10 l10' type="text" id="logoText" name="logoText" onChange={this.handleLogoTextChange} value={this.state.logoText}  />  
                
                <div className = 'addLogoTextSubmit col s2 m2 l2'>
                <input type="submit" value="Add LogoText"/>
                </div>

                </div>   
                </div>

              
             
            </form>
            


<h4 className = 'fontSection'>Fonts</h4>
<div className='row choice-row'>
      {this.props.fonts.map((item, index) => {
  return (

    
  
    <div className = 'font-choice' key = {item._id} index = {index} ><div>
    <div className = 'font-image'><p  onClick={() => { this.props.changeCurrentFont(item) }}><span style={{fontFamily: item}}>{item}</span></p></div></div> </div>


                                

     
        )
  
})}




</div>
      
      </div>

 

     
      
      
    )
  }
}

export default ToolBar