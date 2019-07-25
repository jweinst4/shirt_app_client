import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UploadFile from '../components/UploadFile.js'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';


const emailjs = require('emailjs-com');
const aws = require('aws-sdk');
var base64ToImage = require('base64-to-image');
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
      showShirtColors: true,
      showLogos: false,
      showLogoText: false,
      showSaveAsForm: false,
      name: '',
      nameOfProject: '',
      email: '',
      message: '',
        file_text:"",
      file_upload: null,
      link:'',
      errors: false,
      stageExportLink: '',
    }

 this.changeShirtColorHere = this.changeShirtColorHere.bind(this)
 this.changeCurrentLogo = this.changeCurrentLogo.bind(this)
 this.changeCurrentLogoTextColor = this.changeCurrentLogoTextColor.bind(this)
 this.changeCurrentFont = this.changeCurrentFont.bind(this)

 this.handleLogoTextChange = this.handleLogoTextChange.bind(this)
 this.handleLogoTextSubmit = this.handleLogoTextSubmit.bind(this)

 this.showShirtColorsToggle = this.showShirtColorsToggle.bind(this)
 this.showLogosToggle = this.showLogosToggle.bind(this)
 this.showLogoTextToggle = this.showLogoTextToggle.bind(this)
 this.showSaveAsFormToggle = this.showSaveAsFormToggle.bind(this)

 this.handleContactChange = this.handleContactChange.bind(this)
 this.handleContactSubmit = this.handleContactSubmit.bind(this)
 this.sendEmail = this.sendEmail.bind(this)
}



handleContactChange(event) {
  this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
}

handleContactSubmit(event) {
  event.preventDefault()
  this.setState({stageExportLink: this.props.stageExportLink})

  console.log(this.props.stageExportLink)
  // console.log(this.state.name,this.state.email,this.state.message)
  this.sendEmail(this.state.name,this.state.email,this.state.message,this.props.stageExportLink)
}

sendEmail(name,email,message,stageExportLink) {
  var templateParams = {
    name: name,
    email: email,
    message: message,
    stageExportLink: stageExportLink,
  };
   
  emailjs.send('gmail', 'contact_form', templateParams,'user_9Z15AiUlH6qGAT2Ro6H3m')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         alert('Thank you for your submission!')
      }, function(error) {
         console.log('FAILED...', error);
         alert('There was a technical issue with your submisson.  We will look into this, thank you!')
      });
}

  componentDidMount(){
    this.props.getColors()
    this.props.getLogos()
  }

showShirtColorsToggle() {
  this.setState({showShirtColors: !this.state.showShirtColors})
}

showLogosToggle() {
  this.setState({showLogos: !this.state.showLogos})
}

showLogoTextToggle() {
  this.setState({showLogoText: !this.state.showLogoText})
}

showSaveAsFormToggle() {
  this.setState({showSaveAsForm: !this.state.showSaveAsForm})
}

handleLogoTextChange(event) {
  this.setState({ [event.currentTarget.id]: event.currentTarget.value})
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
          if (this.props.logoTextFrontActive1) {
            this.props.changeCurrentLogoTextColorFront1(item)
          }
          else if (this.props.logoTextFrontActive2) {
            this.props.changeCurrentLogoTextColorFront2(item)
          }
          else if (this.props.logoTextFrontActive3) {
            this.props.changeCurrentLogoTextColorFront3(item)
          }
          else {

          }
          
        }
        
        else if (this.props.frontOrBack === 'back') {
          if (this.props.logoTextBackActive1) {
            this.props.changeCurrentLogoTextColorBack1(item)
          }
          else if (this.props.logoTextBackActive2) {
            this.props.changeCurrentLogoTextColorBack2(item)
          }
          else if (this.props.logoTextBackActive3) {
            this.props.changeCurrentLogoTextColorBack3(item)
          }
          else {

          }
        }

        else {

        }
    }

    else if (this.props.logoTextStrokeToggle) {

      if (this.props.frontOrBack === 'front') {
        if (this.props.logoTextFrontActive1) {
          this.props.changeCurrentLogoTextStrokeFront1(item)
        }
        else if (this.props.logoTextFrontActive2) {
          this.props.changeCurrentLogoTextStrokeFront2(item)
        }
        else if (this.props.logoTextFrontActive3) {
          this.props.changeCurrentLogoTextStrokeFront3(item)
        }
        else {

        }
      }
      
      else if (this.props.frontOrBack === 'back') {
        if (this.props.logoTextBackActive1) {
          this.props.changeCurrentLogoTextStrokeBack1(item)
        }
        else if (this.props.logoTextBackActive2) {
          this.props.changeCurrentLogoTextStrokeBack2(item)
        }
        else if (this.props.logoTextBackActive3) {
          this.props.changeCurrentLogoTextStrokeBack3(item)
        }
        else {

        }
      }

      else {

      }

    }

    else {

    }

}

changeCurrentFont(item) {

  if (this.props.frontOrBack === 'front') {
    if (this.props.logoTextFrontActive1) {
      this.props.changeCurrentFontFront1(item)
    }
    else if (this.props.logoTextFrontActive2) {
      this.props.changeCurrentFontFront2(item)
    }
    else if (this.props.logoTextFrontActive3) {
      this.props.changeCurrentFontFront3(item)
    }
    else {

    }
  }
  else if (this.props.frontOrBack === 'back') {
    if (this.props.logoTextBackActive1) {
      this.props.changeCurrentFontBack1(item)
    }
    else if (this.props.logoTextBackActive2) {
      this.props.changeCurrentFontBack2(item)
    }
    else if (this.props.logoTextBackActive3) {
      this.props.changeCurrentFontBack3(item)
    }
    else {

    }
  }
  
}

changeShirtColorHere(item) {
  this.props.changeCurrentShirtColor(item);
  }


  render () {

    

    return (
      <div className = 'toolbar-content s12 m12 l12'>

<div className = 'row s6 m6 l6'>

<div className = 'col s3 m3 l3' onClick={() => {this.props.frontOfShirt() }}>
<h6 className = 'frontOfShirt' style={{backgroundColor: this.props.frontOfShirtBackgroundColor}} >Front</h6>
</div>
      
  <div className = 'col s3 m3 l3'  onClick={() => {this.props.backOfShirt() }}>
  <h6 className = 'backOfShirt' style={{backgroundColor: this.props.backOfShirtBackgroundColor}}>Back</h6>
  </div>

</div>

  <div><h6 className = 'toggleHeader' onClick = {this.showShirtColorsToggle}><div className = 'headerText'>Shirt Colors</div></h6></div>

  {this.state.showShirtColors ? (
  <> 
  <div className='row choice-row'>

{this.props.colors.map((item, index) => {
return (

<div className = 'shirt-color col s2 m1 l1' key = {item._id} index = {index} onClick={() => { 
this.changeShirtColorHere(item) }} >
<img className = 'shirtImage' src = {this.props.colors[index].swatch}></img> </div>

  )  
})}
</div>

  </>
):(
<>

</>
)}







<div><h6 onClick = {this.showLogosToggle} className = 'toggleHeader'><div className = 'headerText'>Choose/Upload Logo</div></h6></div>

{this.state.showLogos ? (
  <> 

  <UploadFile handleAddLogo={this.props.handleAddLogo}/>
  
 <div className='row choice-row'>
      {this.props.logos.map((item, index) => {
  return (
  
    <div className = 'logo-choice' key = {item._id} index = {index} ><div>
    <div className = 'logo-image'><img className = 'logo-final' src = {item.name} onClick={() => { this.changeCurrentLogo(item) }}></img></div></div> 

    </div>

        )
  
})}


<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoFront1 && this.props.front ? (
  <> 
  <div className = 'col s3 m3 l3'>
  Logo1:
  </div>
  
  <div className = 'col s3 m3 l3'>
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize1Front} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize1Front} >arrow_downwards</i>
 </div>

 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoFrontOne} >delete</i>
 </div>

  </>
):(
<>

</>
)}
</div>


<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoFront2 && this.props.front ? (
  <> 
  <div className = 'col s3 m3 l3'>
  Logo2:
  </div>
  
  <div className = 'col s3 m3 l3'>
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize2Front} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize2Front} >arrow_downwards</i>
 </div>

 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoFrontTwo} >delete</i> 
 </div>
 

  </>
):(
<>

</>
)}
</div>



<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoFront3 && this.props.front ? (
  <> 
  <div className = 'col s3 m3 l3'>
  Logo3:
  </div>
  
  <div className = 'col s3 m3 l3'>
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize3Front} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize3Front} >arrow_downwards</i>
 </div>

 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoFrontThree} >delete</i>
 </div>

  </>
):(
<>

</>
)}
</div>

<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoBack1 && this.props.back ? (
  <> 
  <div className = 'col s3 m3 l3'>
  Logo1:
  </div>
  
  <div className = 'col s3 m3 l3'>
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize1Back} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize1Back} >arrow_downwards</i>
 </div>

 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoBackOne} >delete</i>
 </div>

  </>
):(
<>

</>
)}
</div>

<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoBack2 && this.props.back ? (
  <> 
 <div className = 'col s3 m3 l3'>
  Logo2:
  </div>
  
  <div className = 'col s3 m3 l3'>
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize2Back} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize2Back} >arrow_downwards</i>
 </div>

 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoBackTwo} >delete</i>
 </div>

  </>
):(
<>

</>
)}
</div>

<div className = 'col s12 m12 l12 logoOperators'>
{!!this.props.currentLogoBack3 && this.props.back ? (
  <> 
<div className = 'col s3 m3 l3'>
  Logo3:
  </div>
  
  <div className = 'col s3 m3 l3'> 
  <i className="material-icons arrowUp"  onClick = {this.props.increaseLogoSize3Back} >arrow_upwards</i>
  </div>

  <div className = 'col s3 m3 l3'>
 <i className="material-icons arrowUp"  onClick = {this.props.decreaseLogoSize3Back} >arrow_downwards</i>
 </div>
 
 <div className = 'col s3 m3 l3'>
 <i className="material-icons delete"  onClick = {this.props.deleteCurrentLogoBackThree} >delete</i>
 </div>

  </>
):(
<>

</>
)}


</div>
</div>
  </>
  
):(
<>

</>
)}


<div><h6 onClick = {this.showLogoTextToggle} className = 'toggleHeader'><div className = 'headerText'>Logo Text/Logo Colors</div></h6></div>

{this.state.showLogoText ? (
  <> 
  
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

         {this.props.front && !!this.props.currentLogoTextFront1 ? (
  <>  
   <div className = 'row s12 m12 l12'>
  
              <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextFrontActivate1} style={{backgroundColor: this.props.logoTextBackgroundColorFront1}}>FontSizeFront1:</div> 
              
              <div className = 'col s2 m2 l2'>
                <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeFront1} >arrow_upwards</i>
              </div>
 
              <div className = 'col s2 m2 l2'>
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeFront1} >arrow_downward</i>
               </div>

               <div className = 'col s2 m2 l2'>
               <i className="material-icons delete" onClick = {this.props.deleteTextFrontOne} >delete</i>
               </div>

                </div>

                
            
   </>
 
 ) : (
 <>  
  

 </>
 )}

{this.props.front && !!this.props.currentLogoTextFront2 ? (
  <>  
   <div className = 'row s12 m12 l12'>

  <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextFrontActivate2} style={{backgroundColor: this.props.logoTextBackgroundColorFront2}}>FontSizeFront2:</div>
  
            <div className = 'col s2 m2 l2'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeFront2} >arrow_upwards</i>
             </div>

              <div className = 'col s2 m2 l2'>       
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeFront2} >arrow_downward</i>
               </div>

               <div className = 'col s2 m2 l2'>
               <i className="material-icons delete" onClick = {this.props.deleteTextFrontTwo} >delete</i>
               </div>



                </div>
            
   </>
 
 ) : (
 <>  
  

 </>
 )}

{this.props.front && !!this.props.currentLogoTextFront3 ? (
  <>  
   <div className = 'row s12 m12 l12'>

  <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextFrontActivate3} style={{backgroundColor: this.props.logoTextBackgroundColorFront3}}>FontSizeFront3:</div>
  
            <div className = 'col s2 m2 l2'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeFront3} >arrow_upwards</i>
            </div>
             
            <div className = 'col s2 m2 l2'>
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeFront3} >arrow_downward</i>
               </div>

               <div className = 'col s2 m2 l2'>
               <i className="material-icons delete" onClick = {this.props.deleteTextFrontThree} >delete</i>
               </div>
                </div>
            
   </>
 
 ) : (
 <>  
  

 </>
 )}


{this.props.back && !!this.props.currentLogoTextBack1 ? (
  <>  
   <div className = 'row s12 m12 l12'>

  <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextBackActivate1} style={{backgroundColor: this.props.logoTextBackgroundColorBack1}}>FontSizeBack1:</div>
  
  <div className = 'col s2 m2 l2'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeBack1} >arrow_upwards</i>
              </div>

              <div className = 'col s2 m2 l2'>          
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeBack1} >arrow_downward</i>
               </div>

               <div className = 'col s2 m2 l2'>
               <i className="material-icons delete" onClick = {this.props.deleteTextBackOne} >delete</i>
               </div>

                </div>
            
   </>
 
 ) : (
 <>  
  

 </>
 )}

{this.props.back && !!this.props.currentLogoTextBack2 ? (
  <>  
   <div className = 'row s12 m12 l12'>

  <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextBackActivate2} style={{backgroundColor: this.props.logoTextBackgroundColorBack2}}>FontSizeBack2:</div>
  
  <div className = 'col s2 m2 l2'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeBack2} >arrow_upwards</i>
              </div>
                      
              <div className = 'col s2 m2 l2'>
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeBack2} >arrow_downward</i>
               </div>

               
               <div className = 'col s2 m2 l2'>
               <i className="material-icons delete" onClick = {this.props.deleteTextBackTwo} >delete</i>
               </div>

                </div>
            
   </>
 
 ) : (
 <>  
  

 </>
 )}

{this.props.back && !!this.props.currentLogoTextBack3 ? (
  <>  
   <div className = 'row s12 m12 l12'>

  <div className = 'col s6 m6 l6 activeLogoText' onClick = {this.props.logoTextBackActivate3} style={{backgroundColor: this.props.logoTextBackgroundColorBack3}}>FontSizeBack3:</div> 


            <div className = 'col s2 m2 l2'>
              <i className="material-icons arrowUp"  onClick = {this.props.increaseTextSizeBack3} >arrow_upwards</i>
            </div>

            <div className = 'col s2 m2 l2'>
               <i className="material-icons arrowDown" onClick = {this.props.decreaseTextSizeBack3} >arrow_downward</i>
               </div>

              <div className = 'col s2 m2 l2'> 
               <i className="material-icons delete" onClick = {this.props.deleteTextBackThree} >delete</i>
               </div>



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
  </>
):(
<>

</>
)}

         <div><h6 className = 'toggleSaveAsFormHeader'><div onClick = {this.showSaveAsFormToggle} className = 'headerText saveAsFormHeaderText'>Save and Email Your Shirt!</div></h6></div>

         {this.state.showSaveAsForm ? (
  <> 
 <form className = 'contactForm' onSubmit={this.handleContactSubmit}>
         
         <div className = 'form-inline'>
         <div className = 'form-group'>
         <label htmlFor="name"><span className = 'contactLabel'>Your Name: </span></label>
             <input className = 'contactInput' type="text" id="name" name="name" onChange={this.handleContactChange} value={this.state.name}  />  
             </div>   
             </div>

             <div className = 'form-inline'>
         <div className = 'form-group'>
         <label htmlFor="nameOfProject"><span className = 'contactLabel'>Name of Project: </span></label>
             <input className = 'contactInput' type="text" id="nameOfProject" name="nameOfProject" onChange={this.handleContactChange} value={this.state.nameOfProject}  />  
             </div>   
             </div>

             

             <div className = 'form-inline'>
         <div className = 'form-group'>
         <label htmlFor="email"><span className = 'contactLabel'>Email: </span></label>
             <input className = 'contactInput' type="text" id="email" name="email" onChange={this.handleContactChange} value={this.state.email}  />  
             </div>   
             </div>

             <div className = 'form-row'>
               <input className = 'contactSubmit' type="submit" value="Save and email your shirt!"/>
             </div>
           
         </form>
  </>
):(
<>

</>
)}
      
      </div>

 

     
      
      
    )
}


  }


export default ToolBar