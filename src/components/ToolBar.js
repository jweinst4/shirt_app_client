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
      logoTextFront: '',
      logoTextBack: '',
     }

 this.changeShirtColorHere = this.changeShirtColorHere.bind(this)

 this.handleLogoTextChangeFront = this.handleLogoTextChangeFront.bind(this)
 this.handleLogoTextSubmitFront = this.handleLogoTextSubmitFront.bind(this)

 this.handleLogoTextChangeBack = this.handleLogoTextChangeBack.bind(this)
 this.handleLogoTextSubmitBack = this.handleLogoTextSubmitBack.bind(this)

  }
 

  componentDidMount(){
    this.props.getColors()
    this.props.getLogos()
    }


    handleLogoTextChangeFront(event) {
      this.setState({ [event.currentTarget.id]: event.currentTarget.value})
  }

  handleLogoTextChangeBack(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}

  handleLogoTextSubmitFront(event) {
  event.preventDefault();

  this.props.handleLogoTextSubmitAppFront(this.state.logoTextFront)
  this.setState({logoTextFront: ''})
  
  }

  handleLogoTextSubmitBack(event) {
    event.preventDefault();
  
    this.props.handleLogoTextSubmitAppBack(this.state.logoTextBack)
    this.setState({logoTextBack: ''})
    
    }



changeShirtColorHere(item) {
  this.props.changeCurrentShirtColor(item);
  }


  render () {

    if (this.props.frontOrBack === 'front') {

    return (
      <div className = 'toolbar-content'>

<div className = 'row s6 m6 l6'>
<div className = 'frontOfShirt col s2 m2 l2' style={{backgroundColor: this.props.frontOfShirtBackgroundColor}}onClick={() => { 
      this.props.frontOfShirt() }}>FrontOfShirt</div>
      <div className = 'backOfShirt col s2 m2 l2' style={{backgroundColor: this.props.backOfShirtBackgroundColor}} onClick={() => { 
      this.props.backOfShirt() }}>BackOfShirt</div>

</div>


 <h6>Shirt Colors</h6>
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
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.props.changeCurrentLogoFront(item) }}></img></div></div> </div>

        )
  
})}


</div>
<form className = 'logoTextSection col s12 m12 l12' onSubmit={this.handleLogoTextSubmitFront}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
    
                <input className = 'col s6 m6 l6' type="text" id="logoTextFront" name="logoTextFront" onChange={this.handleLogoTextChangeFront} value={this.state.logoTextFront}  />  
                
                <div className = 'addLogoTextSubmit col s2 m2 l2'>
                <input type="submit" value="Add Logo Text"/>
                </div>

                </div>   
                </div>

              
             
            </form>
            

            <h6 className = 'logoTextColorSection'>Logo Text Colors</h6>
<div className='row choice-row'>

      {this.props.logoTextColor.map((item, index) => {
  return (
    
    <div className = 'logoTextColor-choice col' key = {item._id} index = {index} onClick={() => { 
      this.props.changeCurrentLogoTextColorFront(item) }} ><div className = 'logoTextColor col' style={{backgroundColor: item}} onClick={() => { this.props.changeCurrentLogoTextColorFront(item) }}>
   &nbsp;</div> </div>

        )  
})}
</div>



<h6 className = 'fontSection'>Fonts</h6>
<div className='row choice-row'>
      {this.props.fonts.map((item, index) => {
  return (

    
  
    <div className = 'font-choice' key = {item._id} index = {index} ><div>
    <div className = 'font-image'><p onClick={() => { this.props.changeCurrentFontFront(item) }}><span style={{fontFamily: item}}>{item}</span></p></div></div> </div>


                                

     
        )
  
})}




</div>
      
      </div>

 

     
      
      
    )
}
else if (this.props.frontOrBack === 'back') {

  return (
    <div className = 'toolbar-content'>

<div className = 'row s6 m6 l6'>
<div className = 'frontOfShirt col s2 m2 l2' style={{backgroundColor: this.props.frontOfShirtBackgroundColor}}onClick={() => { 
    this.props.frontOfShirt() }}>FrontOfShirt</div>
    <div className = 'backOfShirt col s2 m2 l2' style={{backgroundColor: this.props.backOfShirtBackgroundColor}} onClick={() => { 
    this.props.backOfShirt() }}>BackOfShirt</div>

</div>


<h6>Shirt Colors</h6>
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
  <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.props.changeCurrentLogoBack(item) }}></img></div></div> </div>

      )

})}


</div>
<form className = 'logoTextSection col s12 m12 l12' onSubmit={this.handleLogoTextSubmitBack}>
       
          <div className = 'form-inline'>
          <div className = 'col s12 m12 l12 form-group'>
  
              <input className = 'col s6 m6 l6' type="text" id="logoTextBack" name="logoTextBack" onChange={this.handleLogoTextChangeBack} value={this.state.logoTextBack}  />  
              
              <div className = 'addLogoTextSubmit col s2 m2 l2'>
              <input type="submit" value="Add Logo Text"/>
              </div>

              </div>   
              </div>

            
           
          </form>
          

          <h6 className = 'logoTextColorSection'>Logo Text Colors</h6>
<div className='row choice-row'>

    {this.props.logoTextColor.map((item, index) => {
return (
  
  <div className = 'logoTextColor-choice col' key = {item._id} index = {index} onClick={() => { 
    this.props.changeCurrentLogoTextColorBack(item) }} ><div className = 'logoTextColor col' style={{backgroundColor: item}} onClick={() => { this.props.changeCurrentLogoTextColorBack(item) }}>
 &nbsp;</div> </div>

      )  
})}
</div>



<h6 className = 'fontSection'>Fonts</h6>
<div className='row choice-row'>
    {this.props.fonts.map((item, index) => {
return (

  

  <div className = 'font-choice' key = {item._id} index = {index} ><div>
  <div className = 'font-image'><p onClick={() => { this.props.changeCurrentFontBack(item) }}><span style={{fontFamily: item}}>{item}</span></p></div></div> </div>


                              

   
      )

})}




</div>
    
    </div>



   
    
    
  )
}

  }
}

export default ToolBar