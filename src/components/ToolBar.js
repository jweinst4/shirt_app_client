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
 this.changeCurrentLogo = this.changeCurrentLogo.bind(this)
 this.changeCurrentLogoTextColor = this.changeCurrentLogoTextColor.bind(this)
 this.changeCurrentFont = this.changeCurrentFont.bind(this)

 this.handleLogoTextChange = this.handleLogoTextChange.bind(this)
 this.handleLogoTextSubmit = this.handleLogoTextSubmit.bind(this)

 this.canvasTestButton = this.canvasTestButton.bind(this)
  }
 
canvasTestButton(event) {
  event.preventDefault();
  this.props.canvasTestButtonApp();
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
    console.log(this.state.logoText);

    if (this.props.frontOrBack === 'front') {
      this.props.handleLogoTextSubmitAppFront(this.state.logoText)
    }
    
    else if (this.props.frontOrBack === 'back') {
      this.props.handleLogoTextSubmitAppBack(this.state.logoText)
    }

    else {

    }

    this.setState({logoText: ''})    
}

changeCurrentLogo(item) {

  if (this.props.frontOrBack === 'front') {
    this.props.changeCurrentLogoFront(item)
  }
  
  else if (this.props.frontOrBack === 'back') {
    this.props.changeCurrentLogoBack(item)
  }

  else {

  }

}

changeCurrentLogoTextColor(item) {

      if (this.props.logoTextFillToggle) {
        if (this.props.frontOrBack === 'front') {
          this.props.changeCurrentLogoTextColorFront(item)
        }
        
        else if (this.props.frontOrBack === 'back') {
          this.props.changeCurrentLogoTextColorBack(item)
        }

        else {

        }
    }

    else if (this.props.logoTextStrokeToggle) {

      if (this.props.frontOrBack === 'front') {
        this.props.changeCurrentLogoTextStrokeFront(item)
      }
      
      else if (this.props.frontOrBack === 'back') {
        this.props.changeCurrentLogoTextStrokeBack(item)
      }

      else {

      }

    }

    else {

    }

}

changeCurrentFont(item) {

  if (this.props.frontOrBack === 'front') {
    this.props.changeCurrentFontFront(item)
  }
  
  else if (this.props.frontOrBack === 'back') {
    this.props.changeCurrentFontBack(item)
  }

  else {

  }

}

changeShirtColorHere(item) {
  this.props.changeCurrentShirtColor(item);
  }


  render () {

    

    return (
      <div className = 'toolbar-content s12 m12 l12'>

<div className = 'row s6 m6 l6'>
<div className = 'col s3 m3 l3' onClick={() => { 
      this.props.frontOfShirt() }}><h6 className = 'frontOfShirt' style={{backgroundColor: this.props.frontOfShirtBackgroundColor}} >Front</h6></div>
      <div className = 'backOfShirt col s3 m3 l3'  onClick={() => { 
      this.props.backOfShirt() }}><h6 className = 'backOfShirt' style={{backgroundColor: this.props.backOfShirtBackgroundColor}}>Back</h6></div>

</div>

 {/* <form className = 'canvasImageSizeSection col s12 m12 l12' onSubmit={this.canvasTestButton}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
    
        
                <div className = 'addLogoTextSubmit col s3 m3 l3'>
                <input type='submit' value='Canvas Test Button'/>
                </div>

                </div>   
                </div>

              
             
</form> */}

 <h6>Shirt Colors</h6>
<div className='row choice-row'>

      {this.props.colors.map((item, index) => {
  return (
    
    <div className = 'shirt-color col s2 m1 l1' key = {item._id} index = {index} onClick={() => { 
      this.changeShirtColorHere(item) }} >
    <img className = 'shirtImage' src = {this.props.colors[index].swatch}></img> </div>

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
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.changeCurrentLogo(item) }}></img></div></div> </div>

        )
  
})}


</div>
<form className = 'logoTextSection col s12 m12 l12' onSubmit={this.handleLogoTextSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
    
                <input className = 'col s6 m6 l6' type='text' id='logoText' name='logoText' onChange={this.handleLogoTextChange} value={this.state.logoText}  />  
                
                <div className = 'addLogoTextSubmit col s2 m2 l2'>
                <input type='submit' value='Add Logo Text'/>
                </div>



                </div>   
                </div>

              
             
            </form>

           

{this.props.front && !!this.props.currentLogoTextFront ? (
  <>
   <div className = 'row s12 m12 l12'>
  <div className = 'col s6 m6 l6 center-align'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeFront} >arrow_upwards</i></div>
             

                <div className = 'col s6 m6 l6  center-align'>
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeFront} >arrow_downward</i></div>
                </div>
            
   </>
 
 ) : (
 <>  
  

 </>
 )}
 {this.props.back &&  !!this.props.currentLogoTextBack ? (
  <>
    <div className = 'row s12 m12 l12'>
  <div className = 'col s6 m6 l6 center-align'>
                <i className="material-icons arrowUp" onClick = {this.props.increaseTextSizeBack} >arrow_upwards</i></div>
            

                <div className = 'col s6 m6 l6 center-align'>
                <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeBack} >arrow_downward</i></div>
                </div>
  

   </>
 
 ) : (
 <>  
  

 </>
 )}

  

 
            
             
         
            
            <div className = 'row s12 m12 l12'>
            <h8 className = 'col s6 m6 l6 logoFillToggle' onClick={() => {this.props.toggleLogoTextFill()}} style={{backgroundColor: this.props.logoFillToggleBackgroundColor}}>Logo Text Fill Color </h8>
            <h8 className = 'col s6 m6 l6 logoStrokeToggle' onClick={() => {this.props.toggleLogoTextStroke()}} style={{backgroundColor: this.props.logoStrokeToggleBackgroundColor}}>Logo Text Stroke Color </h8>
            </div>


            
<div className='row choice-row'>
{this.props.logoTextStrokeToggle ? (
 <>
  <h8 className = 'col s12 m12 l12 clearTextStroke' onClick={() => {this.props.clearLogoTextStroke()}}>Clear Logo Text Stroke</h8>
  </>

) : (
<>  
</>
)}
 


      {this.props.logoTextColor.map((item, index) => {
  return (
    
    <div className = 'logoTextColor-choice col s2 m2 l2' key = {item._id} index = {index} ><div className = 'logoTextColor col' style={{backgroundColor: item}} onClick={() => { this.changeCurrentLogoTextColor(item) }}>
   &nbsp;</div> </div>

        )  
})}
</div>



<h6 className = 'fontSection'>Fonts</h6>
<div className='row choice-row'>
      {this.props.fonts.map((item, index) => {
  return (

    
  
    <div className = 'font-choice' key = {item._id} index = {index} ><div>
    <div className = 'font-image'><p onClick={() => { this.changeCurrentFont(item) }}><span style={{fontFamily: item}}>{item}</span></p></div></div> </div>


                                

     
        )
  
})}




</div>
      
      </div>

 

     
      
      
    )
}


  }


export default ToolBar