import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import NewColor from './components/NewColor.js'
import NewUser from './components/NewUser.js'
import NewLogo from './components/NewLogo.js'
import ToolBar from './components/ToolBar.js'
import Canvas from './components/Canvas.js'
import URLImageBack from './components/Canvas.js'
import PricingFormula from './components/PricingFormula.js'

import './App.css';


let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}

console.log('current base URL:', baseURL)

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      shirtStrokeColor: 'Black',
      currentShirtColor: '',
      colors: [],
      logos: [],
      prices: [],
      users: [],
      
      fonts: ['Comic Sans MS','Verdana','Impact','Hoefler Text','Rockwell','Copperplate','Papyrus','Times New Roman','Times','Courier new','Courier','Verdana','Georgia','Palatino','Trebuchet MS','Arial Black'],

      logoTextColor: ['Red','Blue','White','Pink','Green','Black','Orange','Yellow','Violet','Aqua','Azure','Beige','Brown','Burlywood','Chocolate','Cyan','Darkorange','Fuchsia','Hotpink','Lawngreen','Lime','Maroon','Mistyrose','Olive','Orchid','Peru','Plum','Skyblue','Salmon','Snow','Tan','Teal'],

              currentLogoFront1: '',
              currentFontFront1: 'Arial',
              currentLogoTextFront1: '',
              currentLogoTextColorFront1: 'Black',
              currentLogoTextStrokeFront1: '',

              logo1FrontStartingX: 100,
              logo1FrontStartingY: 100,
              logo1FrontWidth: 130,
              logo1FrontHeight: 45,
              logoTextFontSizeFront1: 30,

              text1FrontStartingX: 200,
              text1FrontStartingY: 200,
        

                  currentLogoFront2: '',
                  currentFontFront2: 'Arial',
                  currentLogoTextFront2: '',
                  currentLogoTextColorFront2: 'Black',
                  currentLogoTextStrokeFront2: '',


                  logo2FrontStartingX: 100,
                  logo2FrontStartingY: 100,
                  logo2FrontWidth: 130,
                  logo2FrontHeight: 45,
                  logoTextFontSizeFront2: 30,

                  text2FrontStartingX: 200,
                  text2FrontStartingY: 300,

              currentLogoFront3: '',
              currentFontFront3: 'Arial',
              currentLogoTextFront3: '',
              currentLogoTextColorFront3: 'Black',
              currentLogoTextStrokeFront3: '',

              logo3FrontStartingX: 100,
              logo3FrontStartingY: 100,
              logo3FrontWidth: 130,
              logo3FrontHeight: 45,
              logoTextFontSizeFront3: 30,

              text3FrontStartingX: 200,
              text3FrontStartingY: 400,

                  currentFontBack1: 'Arial',
                  currentLogoTextBack1: '',
                  currentLogoTextColorBack1: 'Black',
                  currentLogoTextStrokeBack1: '',
                  currentLogoBack1: '',

                  logo1BackStartingX: 100,
                  logo1BackStartingY: 100,
                  logo1BackWidth: 130,
                  logo1BackHeight: 45,
                  logoTextFontSizeBack1: 30,

                  text1BackStartingX: 200,
                  text1BackStartingY: 200,

              currentFontBack2: 'Arial',
              currentLogoTextBack2: '',
              currentLogoTextColorBack2: 'Black',
              currentLogoTextStrokeBack2: '',
              currentLogoBack2: '',

              logo2BackStartingX: 100,
              logo2BackStartingY: 100,
              logo2BackWidth: 130,
              logo2BackHeight: 45,
              logoTextFontSizeBack2: 30,

              text2BackStartingX: 200,
              text2BackStartingY: 300,
      
                  currentFontBack3: 'Arial',
                  currentLogoTextBack3: '',
                  currentLogoTextColorBack3: 'Black',
                  currentLogoTextStrokeBack3: '',
                  currentLogoBack3: '',

                  logo3BackStartingX: 100,
                  logo3BackStartingY: 100,
                  logo3BackWidth: 130,
                  logo3BackHeight: 45,
                  logoTextFontSizeBack3: 30,

                  text3BackStartingX: 200,
                  text3BackStartingY: 400,

              canvasWidth: 560,
              canvasHeight: 670,

              shirtStartingX: 0,
              shirtStartingY: 0,
              shirtWidth: 560,
              shirtHeight: 670,


                  logoTextFrontActive1: true,
                  logoTextFrontActive2: false,
                  logoTextFrontActive3: false,

                  logoTextBackActive1: true,
                  logoTextBackActive2: false,
                  logoTextBackActive3: false,

              logoTextBackgroundColorFront1: '#e3f2fd',
              logoTextBackgroundColorFront2: 'white',
              logoTextBackgroundColorFront3: 'white',

              logoTextBackgroundColorBack1: '#e3f2fd',
              logoTextBackgroundColorBack2: 'white',
              logoTextBackgroundColorBack3: 'white',



                  printSideOneCostApp: '',
                  printSideTwoCostApp: '',

                  location1EmbroideryCost: '',
                  location2EmbroideryCost: '',
                  location3EmbroideryCost: '',
                  location4EmbroideryCost: '',
                  location5EmbroideryCost: '',
                  location6EmbroideryCost: '',

                  lightShirtArray: [[2.25,3.25,4.75,5.75,6.50],[1.75,2.85,3.85,4.80,6.25],[1.05,2.10,2.85,3.30,4.10],[.85,1.75,2.10,2.40,3.00],[.80,1.15,1.55,1.90,2.20],[.60,.95,1.25,1.50,1.70],[.50,.75,.90,1.10,1.30],[.45,.55,.75,.90,1.10],[.40,.50,.60,.75,1.00]],

                  darkShirtArray: [[2.75, 3.75, 5.25, 6.25, 7.00],[2.15, 3.25, 4.25, 5.20, 6.65],[1.35, 2.40, 3.15, 3.60, 4.40],[1.10, 2.00, 2.35, 2.65, 3.25],[.80, 1.15, 1.55, 1.90, 2.20],[.60, .95, 1.25, 1.50, 1.70],[.50, .75, .90, 1.10, 1.30],[.45, .55, .75, .90, 1.10],[.40, .50, .60, .75, 1.00]],

                  embroideryArray: [[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],[4.326,3.9655,3.605,3.2445,2.884,2.6677,2.5235,2.3072,2.163,1.9467,1.8025],[5.562,5.0985,4.635,4.1715,3.708,3.4299,3.2445,2.9664,2.781,2.5029,2.3175],[6.798,6.2315,5.665,5.0985,4.532,4.1921,3.9655,3.6256,3.399,3.0591,2.8325],[8.034,7.3645,6.695,6.0255,5.356,4.9543,4.6865,4.2848,4.017,3.6153,3.3475],[9.27,8.4975,7.725,6.9525,6.18,5.7165,5.4075,4.944,4.635,4.1715,3.8625],[10.506,9.6305,8.755,7.8795,7.004,6.4787,6.1285,5.6032,5.047,0,0],[11.742,10.7635,9.785,8.8065,7.828,7.2409,6.8495,6.2624,5.871,0,0],[12.978,11.8965,10.815,9.7335,8.652,8.0031,7.5705,6.9216,6.489,0,0],[14.214,13.0295,11.845,10.6605,9.476,8.7653,8.2915,7.5808,7.107,0,0],[15.45,14.1625,12.875,11.5875,10.3,9.5275,9.0125,8.24,7.725,0,0]],

                  
                  lightShirtBackgroundColor: '#e3f2fd',
                  darkShirtBackgroundColor: 'white',
                  embroideryBackgroundColor: 'white',

                  currentPricingType: 'lightShirt',
                  lightOrDarkPricing: true,
                  embroideryPricing: false,logoTextFillToggle: true,

              logoTextStrokeToggle: false,
              logoFillToggleBackgroundColor: '#e3f2fd',
              logoStrokeToggleBackgroundColor: 'white',
              logoFillToggleBackgroundColor: '#e3f2fd',
              logoStrokeToggleBackgroundColor: 'white',
              
              frontOrBack: 'front',
              front: true,
              back: false,
              frontOfShirtBackgroundColor: '#e3f2fd',
              backOfShirtBackgroundColor: 'white',
    
              shirtRatio: 1.25,
              shirtCanvasWidth: 560,
              shirtCanvasHeight: 670,
              shirtWidth: 560,
              shirtHeight: 670,

    }

      this.lightShirtPricing = this.lightShirtPricing.bind(this)
      this.darkShirtPricing = this.darkShirtPricing.bind(this)
      this.embroideryPricing = this.embroideryPricing.bind(this)

          this.deleteColor = this.deleteColor.bind(this)
          this.getColors = this.getColors.bind(this)
          this.handleAddColor = this.handleAddColor.bind(this)

      this.deleteUser = this.deleteUser.bind(this)
      this.getUsers = this.getUsers.bind(this)
      this.handleAddUser = this.handleAddUser.bind(this)

          this.deleteLogo = this.deleteLogo.bind(this)
          this.getLogos = this.getLogos.bind(this)
          this.handleAddLogo = this.handleAddLogo.bind(this)

      this.getPrices = this.getPrices.bind(this)

          this.changeCurrentShirtColor= this.changeCurrentShirtColor.bind(this)
          this.changeCurrentLogoFront= this.changeCurrentLogoFront.bind(this)
          this.changeCurrentLogoBack= this.changeCurrentLogoBack.bind(this)
          this.clearLogoTextStroke = this.clearLogoTextStroke.bind(this)

      this.handlePriceSubmitApp = this.handlePriceSubmitApp.bind(this)
      this.handlePriceSubmitEmbroideryApp = this.handlePriceSubmitEmbroideryApp.bind(this)

        this.handleLogoTextSubmitAppFront = this.handleLogoTextSubmitAppFront.bind(this)
        this.handleLogoTextSubmitAppBack = this.handleLogoTextSubmitAppBack.bind(this)

      this.frontOfShirt = this.frontOfShirt.bind(this)
      this.backOfShirt = this.backOfShirt.bind(this)

        this.toggleLogoTextFill = this.toggleLogoTextFill.bind(this)
        this.toggleLogoTextStroke = this.toggleLogoTextStroke.bind(this)

      this.increaseTextSizeFront1 = this.increaseTextSizeFront1.bind(this)
      this.decreaseTextSizeFront1 = this.decreaseTextSizeFront1.bind(this)
      this.changeCurrentLogoTextColorFront1= this.changeCurrentLogoTextColorFront1.bind(this)
      this.changeCurrentLogoTextStrokeFront1= this.changeCurrentLogoTextStrokeFront1.bind(this)
      this.increaseLogoSize1Front = this.increaseLogoSize1Front.bind(this)
      this.decreaseLogoSize1Front = this.decreaseLogoSize1Front.bind(this)
      this.logoTextFrontActivate1 = this.logoTextFrontActivate1.bind(this)
      this.changeCurrentFontFront1= this.changeCurrentFontFront1.bind(this)
    
          this.increaseTextSizeFront2 = this.increaseTextSizeFront2.bind(this)
          this.decreaseTextSizeFront2 = this.decreaseTextSizeFront2.bind(this)
          this.changeCurrentLogoTextColorFront2= this.changeCurrentLogoTextColorFront2.bind(this)
          this.changeCurrentLogoTextStrokeFront2= this.changeCurrentLogoTextStrokeFront2.bind(this)
          this.increaseLogoSize2Front = this.increaseLogoSize2Front.bind(this)
          this.decreaseLogoSize2Front = this.decreaseLogoSize2Front.bind(this)
          this.logoTextFrontActivate2 = this.logoTextFrontActivate2.bind(this)
          this.changeCurrentFontFront2= this.changeCurrentFontFront2.bind(this)

      this.increaseTextSizeFront3 = this.increaseTextSizeFront3.bind(this)
      this.decreaseTextSizeFront3 = this.decreaseTextSizeFront3.bind(this)
      this.changeCurrentLogoTextColorFront3= this.changeCurrentLogoTextColorFront3.bind(this)
      this.changeCurrentLogoTextStrokeFront3= this.changeCurrentLogoTextStrokeFront3.bind(this)
      this.increaseLogoSize3Front = this.increaseLogoSize3Front.bind(this)
      this.decreaseLogoSize3Front = this.decreaseLogoSize3Front.bind(this)
      this.logoTextFrontActivate3 = this.logoTextFrontActivate3.bind(this) 
      this.changeCurrentFontFront3= this.changeCurrentFontFront3.bind(this)

          this.increaseTextSizeBack1 = this.increaseTextSizeBack1.bind(this)
          this.decreaseTextSizeBack1 = this.decreaseTextSizeBack1.bind(this)
          this.changeCurrentLogoTextColorBack1= this.changeCurrentLogoTextColorBack1.bind(this)
          this.changeCurrentLogoTextStrokeBack1= this.changeCurrentLogoTextStrokeBack1.bind(this)
          this.increaseLogoSize1Back = this.increaseLogoSize1Back.bind(this)
          this.decreaseLogoSize1Back = this.decreaseLogoSize1Back.bind(this)
          this.logoTextBackActivate1 = this.logoTextBackActivate1.bind(this)
          this.changeCurrentFontBack1= this.changeCurrentFontBack1.bind(this)

      this.increaseTextSizeBack2 = this.increaseTextSizeBack2.bind(this)
      this.decreaseTextSizeBack2 = this.decreaseTextSizeBack2.bind(this)
      this.changeCurrentLogoTextColorBack2= this.changeCurrentLogoTextColorBack2.bind(this)
      this.changeCurrentLogoTextStrokeBack2= this.changeCurrentLogoTextStrokeBack2.bind(this)
      this.increaseLogoSize2Back = this.increaseLogoSize2Back.bind(this)
      this.decreaseLogoSize2Back = this.decreaseLogoSize2Back.bind(this)
      this.logoTextBackActivate2 = this.logoTextBackActivate2.bind(this) 
      this.changeCurrentFontBack2= this.changeCurrentFontBack2.bind(this)

          this.increaseTextSizeBack3 = this.increaseTextSizeBack3.bind(this)
          this.decreaseTextSizeBack3 = this.decreaseTextSizeBack3.bind(this)
          this.changeCurrentLogoTextColorBack3= this.changeCurrentLogoTextColorBack3.bind(this)
          this.changeCurrentLogoTextStrokeBack3= this.changeCurrentLogoTextStrokeBack3.bind(this)
          this.increaseLogoSize3Back = this.increaseLogoSize3Back.bind(this)
          this.decreaseLogoSize3Back = this.decreaseLogoSize3Back.bind(this)
          this.logoTextBackActivate3 = this.logoTextBackActivate3.bind(this) 
          this.changeCurrentFontBack3= this.changeCurrentFontBack3.bind(this)
 
  }

      logoTextFrontActivate1() {
        this.setState({logoTextFrontActive1: true})
        this.setState({logoTextFrontActive2: false})
        this.setState({logoTextFrontActive3: false})
        this.setState({logoTextBackgroundColorFront1:'#e3f2fd'})
        this.setState({logoTextBackgroundColorFront2:'white'})
        this.setState({logoTextBackgroundColorFront3:'white'})
      }

      logoTextFrontActivate2() {
        this.setState({logoTextFrontActive1: false})
        this.setState({logoTextFrontActive2: true})
        this.setState({logoTextFrontActive3: false})
        this.setState({logoTextBackgroundColorFront1:'white'})
        this.setState({logoTextBackgroundColorFront2:'#e3f2fd'})
        this.setState({logoTextBackgroundColorFront3:'white'})
      }

      logoTextFrontActivate3() {
        this.setState({logoTextFrontActive1: false})
        this.setState({logoTextFrontActive2: false})
        this.setState({logoTextFrontActive3: true})
        this.setState({logoTextBackgroundColorFront1:'white'})
        this.setState({logoTextBackgroundColorFront2:'white'})
        this.setState({logoTextBackgroundColorFront3:'#e3f2fd'})
      }

          logoTextBackActivate1() {
            this.setState({logoTextBackActive1: true})
            this.setState({logoTextBackActive2: false})
            this.setState({logoTextBackActive3: false})  
            this.setState({logoTextBackgroundColorBack1:'#e3f2fd'})
            this.setState({logoTextBackgroundColorBack2:'white'})
            this.setState({logoTextBackgroundColorBack3:'white'})
          }

          logoTextBackActivate2() {
            this.setState({logoTextBackActive1: false})
            this.setState({logoTextBackActive2: true})
            this.setState({logoTextBackActive3: false})  
            this.setState({logoTextBackgroundColorBack1:'white'})
            this.setState({logoTextBackgroundColorBack2:'#e3f2fd'})
            this.setState({logoTextBackgroundColorBack3:'white'})
          }

          logoTextBackActivate3() {
            this.setState({logoTextBackActive1: false})
            this.setState({logoTextBackActive2: false})
            this.setState({logoTextBackActive3: true}) 
            this.setState({logoTextBackgroundColorBack1:'white'})
            this.setState({logoTextBackgroundColorBack2:'white'})
            this.setState({logoTextBackgroundColorBack3:'#e3f2fd'}) 
          }


      increaseLogoSize1Front () {

        this.setState({logo1FrontWidth: this.state.logo1FrontWidth * 1.1})
        this.setState({logo1FrontHeight: this.state.logo1FrontHeight * 1.1})
      }

      decreaseLogoSize1Front () {

        this.setState({logo1FrontWidth: this.state.logo1FrontWidth / 1.1})
        this.setState({logo1FrontHeight: this.state.logo1FrontHeight / 1.1})
      }
      
      increaseLogoSize2Front () {
        this.setState({logo2FrontWidth: this.state.logo2FrontWidth * 1.1})
        this.setState({logo2FrontHeight: this.state.logo2FrontHeight * 1.1})
      }

      decreaseLogoSize2Front () {

        this.setState({logo2FrontWidth: this.state.logo2FrontWidth / 1.1})
        this.setState({logo2FrontHeight: this.state.logo2FrontHeight / 1.1})
      }

      increaseLogoSize3Front () {

        this.setState({logo3FrontWidth: this.state.logo3FrontWidth * 1.1})
        this.setState({logo3FrontHeight: this.state.logo3FrontHeight * 1.1})
      }

      decreaseLogoSize3Front () {

        this.setState({logo3FrontWidth: this.state.logo3FrontWidth / 1.1})
        this.setState({logo3FrontHeight: this.state.logo3FrontHeight / 1.1})
      }

          increaseLogoSize1Back () {

            this.setState({logo1BackWidth: this.state.logo1BackWidth * 1.1})
            this.setState({logo1BackHeight: this.state.logo1BackHeight * 1.1})
          }

          decreaseLogoSize1Back () {

            this.setState({logo1BackWidth: this.state.logo1BackWidth / 1.1})
            this.setState({logo1BackHeight: this.state.logo1BackHeight / 1.1})
          }

          increaseLogoSize2Back () {

            this.setState({logo2BackWidth: this.state.logo2BackWidth * 1.1})
            this.setState({logo2BackHeight: this.state.logo2BackHeight * 1.1})
          }

          decreaseLogoSize2Back () {

            this.setState({logo2BackWidth: this.state.logo2BackWidth / 1.1})
            this.setState({logo2BackHeight: this.state.logo2BackHeight / 1.1})
          }

          increaseLogoSize3Back () {

            this.setState({logo3BackWidth: this.state.logo3BackWidth * 1.1})
            this.setState({logo3BackHeight: this.state.logo3BackHeight * 1.1})
          }

          decreaseLogoSize3Back () {

            this.setState({logo3BackWidth: this.state.logo3BackWidth / 1.1})
            this.setState({logo3BackHeight: this.state.logo3BackHeight / 1.1})
          }



      increaseTextSizeFront1 () {

        this.setState({logoTextFontSizeFront1: this.state.logoTextFontSizeFront1 * 1.1})
      }

      decreaseTextSizeFront1 () {
        this.setState({logoTextFontSizeFront1: this.state.logoTextFontSizeFront1 / 1.1})

      }

      increaseTextSizeFront2 () {

        this.setState({logoTextFontSizeFront2: this.state.logoTextFontSizeFront2 * 1.1})
      }

      decreaseTextSizeFront2 () {
        this.setState({logoTextFontSizeFront2: this.state.logoTextFontSizeFront2 / 1.1})

      }

      increaseTextSizeFront3 () {

        this.setState({logoTextFontSizeFront3: this.state.logoTextFontSizeFront3 * 1.1})
      }

      decreaseTextSizeFront3 () {
        this.setState({logoTextFontSizeFront3: this.state.logoTextFontSizeFront3 / 1.1})

      }


          increaseTextSizeBack1 () {

            this.setState({logoTextFontSizeBack1: this.state.logoTextFontSizeBack1 * 1.1})
          }

          decreaseTextSizeBack1 () {
            this.setState({logoTextFontSizeBack1: this.state.logoTextFontSizeBack1 / 1.1})

          }

          increaseTextSizeBack2 () {

            this.setState({logoTextFontSizeBack2: this.state.logoTextFontSizeBack2 * 1.1})
          }

          decreaseTextSizeBack2 () {
            this.setState({logoTextFontSizeBack2: this.state.logoTextFontSizeBack2/ 1.1})

          }

          increaseTextSizeBack3 () {

            this.setState({logoTextFontSizeBack3: this.state.logoTextFontSizeBack3 * 1.1})
          }

          decreaseTextSizeBack3 () {
            this.setState({logoTextFontSizeBack3: this.state.logoTextFontSizeBack3 / 1.1})

          }


      toggleLogoTextFill() {
        if (!this.state.logoTextFillToggle) {
          this.setState({logoTextFillToggle: !this.state.logoTextFillToggle})
          this.setState({logoTextStrokeToggle: !this.state.logoTextStrokeToggle}) 

          this.setState({logoFillToggleBackgroundColor: '#e3f2fd'})
          this.setState({logoStrokeToggleBackgroundColor: 'white'})
        }
      }

      toggleLogoTextStroke() {
        if (!this.state.logoTextStrokeToggle) {
        this.setState({logoTextFillToggle: !this.state.logoTextFillToggle})
        this.setState({logoTextStrokeToggle: !this.state.logoTextStrokeToggle}) 

        this.setState({logoFillToggleBackgroundColor: 'white'})
        this.setState({logoStrokeToggleBackgroundColor: '#e3f2fd'})
        }
      }


          frontOfShirt() {
            this.setState({frontOrBack: 'front'})  
            this.setState({front: true}) 
            this.setState({back: false})  
            this.setState({frontOfShirtBackgroundColor: '#e3f2fd'})
            this.setState({backOfShirtBackgroundColor: 'white'})  
          }

          backOfShirt() {
            this.setState({frontOrBack: 'back'})  
            this.setState({back: true}) 
            this.setState({front: false})  
            this.setState({backOfShirtBackgroundColor: '#e3f2fd'})
            this.setState({frontOfShirtBackgroundColor: 'white'}) 
          }


      lightShirtPricing() {
        this.setState({currentPricingType: 'lightShirt'})  
        this.setState({lightShirtBackgroundColor: '#e3f2fd'})
        this.setState({darkShirtBackgroundColor: 'white'})
        this.setState({embroideryBackgroundColor: 'white'})  
        this.setState({lightOrDarkPricing: true})
        this.setState({embroideryPricing: false})  
        
      }

      darkShirtPricing() {
        this.setState({currentPricingType: 'darkShirt'})  
        this.setState({lightShirtBackgroundColor: 'white'})
        this.setState({darkShirtBackgroundColor: '#e3f2fd'})
        this.setState({embroideryBackgroundColor: 'white'})
        this.setState({lightOrDarkPricing: true})
        this.setState({embroideryPricing: false})    
      }

      embroideryPricing() {
        this.setState({currentPricingType: 'embroidery'})  
        this.setState({lightShirtBackgroundColor: 'white'})
        this.setState({darkShirtBackgroundColor: 'white'})
        this.setState({embroideryBackgroundColor: '#e3f2fd'})  
        this.setState({lightOrDarkPricing: false})
        this.setState({embroideryPricing: true})  
      }


        changeCurrentShirtColor(item) {
              this.setState ({currentShirtColor: item})
        }


      changeCurrentLogoFront(item) {

        if (!this.state.currentLogoFront1) {
          
          this.setState ({currentLogoFront1: item.name})
        }
        else if (!this.state.currentLogoFront2) {
          this.setState ({currentLogoFront2: item.name})
          
        }
        else if (!this.state.currentLogoFront3) {
          this.setState ({currentLogoFront3: item.name})
          
        }
        else {

        }
      }

      changeCurrentLogoBack(item) {

        if (!this.state.currentLogoBack1) {
          this.setState ({currentLogoBack1: item.name})
        }
        else if (!this.state.currentLogoBack2) {
          this.setState ({currentLogoBack2: item.name})
        }
        else if (!this.state.currentLogoBack3) {
          this.setState ({currentLogoBack3: item.name})
        }
        else {

        }
      }


          changeCurrentFontFront1(item) { 
              this.setState ({currentFontFront1: item})
          }

          changeCurrentFontFront2(item) { 
              this.setState ({currentFontFront2: item})
          }

          changeCurrentFontFront3(item) { 
            this.setState ({currentFontFront3: item})
          }

      changeCurrentFontBack1(item) { 
        this.setState ({currentFontBack1: item})
      }
    
      changeCurrentFontBack2(item) { 
        this.setState ({currentFontBack2: item})
      }
      
      changeCurrentFontBack3(item) { 
        this.setState ({currentFontBack3: item})
      }



    changeCurrentLogoTextColorFront1(item) {

      this.setState ({currentLogoTextColorFront1: item})
    }

    changeCurrentLogoTextColorFront2(item) {

    this.setState ({currentLogoTextColorFront2: item})
    }

    changeCurrentLogoTextColorFront3(item) {

    this.setState ({currentLogoTextColorFront3: item})
    }

        changeCurrentLogoTextColorBack1(item) {

        this.setState ({currentLogoTextColorBack1: item})
        }

        changeCurrentLogoTextColorBack2(item) {

        this.setState ({currentLogoTextColorBack2: item})
        }

        changeCurrentLogoTextColorBack3(item) {

          this.setState ({currentLogoTextColorBack3: item})
        }


    changeCurrentLogoTextStrokeFront1(item) {

    this.setState ({currentLogoTextStrokeFront1: item})
    }

    changeCurrentLogoTextStrokeFront2(item) {

    this.setState ({currentLogoTextStrokeFront2: item})
    }

    changeCurrentLogoTextStrokeFront3(item) {

    this.setState ({currentLogoTextStrokeFront3: item})
    }

        changeCurrentLogoTextStrokeBack1(item) {

        this.setState ({currentLogoTextStrokeBack1: item})
        }

        changeCurrentLogoTextStrokeBack2(item) {

        this.setState ({currentLogoTextStrokeBack2: item})
        }

        changeCurrentLogoTextStrokeBack3(item) {

        this.setState ({currentLogoTextStrokeBack3: item})
        }


    clearLogoTextStroke() {

this.setState ({currentLogoTextStrokeFront: ''})
this.setState ({currentLogoTextStrokeBack: ''})
    }

        handleAddColor(color) {
        console.log(color)
          this.getColors()
          const copyColors = [...this.state.colors]
          copyColors.unshift(color)
          this.setState({
            colors: copyColors,
            name: '',
            url: '',
            swatch: '',
            backURL: '',
          })
        }

        handleAddUser(user) {
        
          this.getUsers()
          const copyUsers = [...this.state.users]
          copyUsers.unshift(user.name)
          this.setState({
            users: copyUsers,
            name: '',
            age: '',
            size: '',
          })
        }

        handleAddLogo(logo) {
        
          this.getLogos()
          const copyLogos = [...this.state.logos]
          copyLogos.unshift(logo.name)
          this.setState({
            logos: copyLogos,
            name: '',
            user_id: '',
          })
        }

        deleteColor(id) {

          fetch(baseURL + '/colors/' + id, { method: 'DELETE' }).then(response => {
              const findIndex = this.state.colors.findIndex(color => color.id === id)
              const copyColors = [...this.state.colors]
              copyColors.splice(findIndex, 1)
              this.setState({ colors: copyColors })
              
              this.setState({shirtFillColor: this.state.colors[0].name})
            
          })
          
        }

        deleteUser(id) {

          fetch(baseURL + '/users/' + id, { method: 'DELETE' }).then(response => {
              const findIndex = this.state.users.findIndex(user => user.id === id)
              const copyUsers = [...this.state.users]
              copyUsers.splice(findIndex, 1)
              this.setState({ users: copyUsers })
              
          })
          
        }

        deleteLogo(id) {

          fetch(baseURL + '/logos/' + id, { method: 'DELETE' }).then(response => {
              const findIndex = this.state.logos.findIndex(logo => logo.id === id)
              const copyLogos = [...this.state.logos]
              copyLogos.splice(findIndex, 1)
              this.setState({ logos: copyLogos })
          })
          
        }

        getColors() {
          fetch(baseURL+ '/colors')
            .then(data => {
              return data.json()},
              err => console.log(err))
            .then(parsedData => this.setState({colors: parsedData}),
            
            err=> console.log(err))
            .then(parsedData => this.setState({currentShirtColor: this.state.colors[0]}),
            err=> console.log(err))
            
            
        }

        getUsers() {
          fetch(baseURL+ '/users')
            .then(data => {
              return data.json()},
              err => console.log(err))
            .then(parsedData => this.setState({users: parsedData}),
            
            err=> console.log(err))
          
        }

        getLogos() {
          fetch(baseURL+ '/logos')
            .then(data => {
              return data.json()},
              err => console.log(err))
            .then(parsedData => this.setState({logos: parsedData}),
            
            err=> console.log(err))
          
        }

        getPrices() {
          fetch(baseURL+ '/prices')
            .then(data => {
              return data.json()},
              err => console.log(err))
            .then(parsedData => this.setState({prices: parsedData}),
            
            err=> console.log(err))
          
        }


      handleLogoTextSubmitAppFront(item) {
        

        if (!this.state.currentLogoTextFront1) {

          this.setState ({currentLogoTextFront1: item})
        }
        else if (!this.state.currentLogoTextFront2) {
          this.setState ({currentLogoTextFront2: item})

        }
        else if (!this.state.currentLogoTextFront3) {
          this.setState ({currentLogoTextFront3: item})

        }
        else {

        }
        
      }

      handleLogoTextSubmitAppBack(item) {
        

        if (!this.state.currentLogoTextBack1) {

          this.setState ({currentLogoTextBack1: item})
        }
        else if (!this.state.currentLogoTextBack2) {
          this.setState ({currentLogoTextBack2: item})

        }
        else if (!this.state.currentLogoTextBack3) {
          this.setState ({currentLogoTextBack3: item})

        }
        else {

        }
        
      }

      handlePriceSubmitApp(quantity,printSideOneQuantity,printSideTwoQuantity) {
        let quantityArray = 0;

        if (quantity < 12) {
          quantityArray = 0;
        }
        else if (quantity < 37) {
          quantityArray = 1;
        }
        else if (quantity < 73) {
          quantityArray = 2;
        }
        else if (quantity < 144) {
          quantityArray = 3;
        }
        else if (quantity < 289) {
          quantityArray = 4;
        }
        else if (quantity < 500) {
          quantityArray = 5;
        }
        else if (quantity < 1000) {
          quantityArray = 6;
        }
        else if (quantity < 5000) {
          quantityArray = 7;
        }
        else if (quantity >= 5000) {
          quantityArray = 8;
        }
        else  {
          
        }

        


        if (this.state.currentPricingType === 'lightShirt') {
          this.setState({printSideOneCostApp: this.state.lightShirtArray[quantityArray][printSideOneQuantity - 1]})

          this.setState({printSideTwoCostApp: this.state.lightShirtArray[quantityArray][printSideTwoQuantity - 1]})
        }
        else if (this.state.currentPricingType === 'darkShirt') {
          this.setState({printSideOneCostApp: this.state.darkShirtArray[quantityArray][printSideOneQuantity - 1]})

          this.setState({printSideTwoCostApp: this.state.darkShirtArray[quantityArray][printSideTwoQuantity - 1]})
        }
        else {

        }

        if (!printSideOneQuantity) {
          this.setState({printSideOneCostApp: 0})
        }

        if (!printSideTwoQuantity) {
          this.setState({printSideTwoCostApp: 0})
        }

        
      }

      handlePriceSubmitEmbroideryApp(quantity,location1,location2,location3,location4,location5,location6) {
        let quantityArray = 0;
        let location1StitchArray = '';
        let location2StitchArray = '';
        let location3StitchArray = '';
        let location4StitchArray = '';
        let location5StitchArray = '';
        let location6StitchArray = '';
      
        if (quantity < 6) {
          quantityArray = 0;
        }
        else if (quantity < 12) {
          quantityArray = 1;
        }
        else if (quantity < 24) {
          quantityArray = 2;
        }
        else if (quantity < 48) {
          quantityArray = 3;
        }
        else if (quantity < 100) {
          quantityArray = 4;
        }
        else if (quantity < 200) {
          quantityArray = 5;
        }
        else if (quantity < 400) {
          quantityArray = 6;
        }
        else if (quantity < 800) {
          quantityArray = 7;
        }
        else if (quantity < 1600) {
          quantityArray = 8;
        }
        else if (quantity >= 1600) {
          quantityArray = 9;
        }
        else  {
          
        }


        if (!location1) {
          location1StitchArray = 0;

        }
      else if (location1 < 5000) {
          location1StitchArray = 1;
        }
        else if (location1 < 7000) {
          location1StitchArray = 2;
        }
        else if (location1 < 9000) {
          location1StitchArray = 3;
        }
        else if (location1 < 11000) {
          location1StitchArray = 4;
        }
        else if (location1 < 13000) {
          location1StitchArray = 5;
        }
        else if (location1 < 15000) {
          location1StitchArray = 6;
        }
        else if (location1 < 17000) {
          location1StitchArray = 7;
        }
        else if (location1 < 19000) {
          location1StitchArray = 8;
        }
        else if (location1 < 21000) {
          location1StitchArray = 9;
        }
        else if (location1 >= 21000) {
          location1StitchArray = 10;
        }
        else  {
          
        }


        if (!location2) {
          location2StitchArray = 0;
          
        }
        else if (location2 < 5000) {
          location2StitchArray = 1;
        }
        else if (location2 < 7000) {
          location2StitchArray = 2;
        }
        else if (location2 < 9000) {
          location2StitchArray = 3;
        }
        else if (location2 < 11000) {
        location2StitchArray = 4;
        }
        else if (location2 < 13000) {
          location2StitchArray = 5;
        }
        else if (location2 < 15000) {
          location2StitchArray = 6;
        }
        else if (location2 < 17000) {
          location2StitchArray = 7;
        }
        else if (location2 < 19000) {
          location2StitchArray = 8;
        }
        else if (location2 < 21000) {
          location2StitchArray = 9;
        }
        else if (location2 >= 21000) {
          location2StitchArray = 10;
        }
        else  {
          
        }

        if (!location3){
          location3StitchArray = 0;
          
        }
        else if (location3 < 5000) {
          location3StitchArray = 1;
        }
        else if (location3 < 7000) {
          location3StitchArray = 2;
        }
        else if (location3 < 9000) {
          location3StitchArray = 3;
        }
        else if (location3 < 11000) {
        location3StitchArray = 4;
        }
        else if (location3 < 13000) {
          location3StitchArray = 5;
        }
        else if (location3 < 15000) {
          location3StitchArray = 6;
        }
        else if (location3 < 17000) {
          location3StitchArray = 7;
        }
        else if (location3 < 19000) {
          location3StitchArray = 8;
        }
        else if (location3 < 21000) {
          location3StitchArray = 9;
        }
        else if (location3 >= 21000) {
          location3StitchArray = 10;
        }
        else  {
          
        }

        if (!location4) {
          location4StitchArray = 0;
        }
        else if (location4 < 5000) {
          location4StitchArray = 1;
        }
        else if (location4 < 7000) {
          location4StitchArray = 2;
        }
        else if (location4 < 9000) {
          location4StitchArray = 3;
        }
        else if (location4 < 11000) {
        location4StitchArray = 4;
        }
        else if (location4 < 13000) {
          location4StitchArray = 5;
        }
        else if (location4 < 15000) {
          location4StitchArray = 6;
        }
        else if (location4 < 17000) {
          location4StitchArray = 7;
        }
        else if (location4 < 19000) {
          location4StitchArray = 8;
        }
        else if (location4 < 21000) {
          location4StitchArray = 9;
        }
        else if (location4 >= 21000) {
          location4StitchArray = 10;
        }
        else  {
          
        }

        if  (!location5) {
          location5StitchArray = 0;
        }
        else if (location5 < 5000) {
          location5StitchArray = 1;
        }
        else if (location5 < 7000) {
          location5StitchArray = 2;
        }
        else if (location5 < 9000) {
          location5StitchArray = 3;
        }
        else if (location5 < 11000) {
        location5StitchArray = 4;
        }
        else if (location5 < 13000) {
          location5StitchArray = 5;
        }
        else if (location5 < 15000) {
          location5StitchArray = 6;
        }
        else if (location5 < 17000) {
          location5StitchArray = 7;
        }
        else if (location5 < 19000) {
          location5StitchArray = 8;
        }
        else if (location5 < 21000) {
          location5StitchArray = 9;
        }
        else if (location5 >= 21000) {
          location5StitchArray = 10;
        }
        else  {
          
        }


        if (!location6){
          location6StitchArray = 0;
        }
        else if (location6 < 5000) {
          location6StitchArray = 1;
        }
        else if (location6 < 7000) {
          location6StitchArray = 2;
        }
        else if (location6 < 9000) {
          location6StitchArray = 3;
        }
        else if (location6 < 11000) {
        location6StitchArray = 4;
        }
        else if (location6 < 13000) {
          location6StitchArray = 5;
        }
        else if (location6 < 15000) {
          location6StitchArray = 6;
        }
        else if (location6 < 17000) {
          location6StitchArray = 7;
        }
        else if (location6 < 19000) {
          location6StitchArray = 8;
        }
        else if (location6 < 21000) {
          location6StitchArray = 9;
        }
        else if (location6 >= 21000) {
          location6StitchArray = 10;
        }
        else  {
          
        }
      


          this.setState({location1EmbroideryCost: this.state.embroideryArray[location1StitchArray][quantityArray]})
          this.setState({location2EmbroideryCost: this.state.embroideryArray[location2StitchArray][quantityArray]})
          this.setState({location3EmbroideryCost: this.state.embroideryArray[location3StitchArray][quantityArray]})
          this.setState({location4EmbroideryCost: this.state.embroideryArray[location4StitchArray][quantityArray]})
          this.setState({location5EmbroideryCost: this.state.embroideryArray[location5StitchArray][quantityArray]})
          this.setState({location6EmbroideryCost: this.state.embroideryArray[location6StitchArray][quantityArray]})
        
      }


  render() {

    return (

      <Router>

        <div className = 'appContainer row'>
            <div className = 'navBar row s12 m12 l12'>

              <div className = 'topCol col s12 m5 l2'>
              <Link to={'/'}>Home</Link>
              </div>

              <div className = 'topCol col s12 m5 l2'>
              <Link to={'/newShirt'}>NewShirt</Link>
              </div>

              <div className = 'topCol col s12 m5 l2'>
              <Link to={'/newUser'}>NewUser</Link>
              </div>

              <div className = 'topCol col s12 m5 l2'>
              <Link to={'/newLogo'}>NewLogo</Link>
              </div>

              <div className = 'topCol col s12 m5 l2'>
              <Link to={'/pricingFormula'}>PricingFormula</Link>
              </div>

               {/* <div className = 'topCol col s12 m5 l2'>
              <Link to={'/shirtTest'}>ShirtTest</Link>
              </div>  */}

            </div>


          <div className = 'canvasToolbarRow row'>

            <div className = 'canvasCol col s12 m12 l8'>
              <Route exact path ='/' exact render={() => <Canvas 

                  shirtStartingX = {this.state.shirtStartingX} shirtStartingY = {this.state.shirtStartingY}
                  shirtWidth = {this.state.shirtWidth} shirtHeight = {this.state.shirtHeight}
                  currentShirtColor={this.state.currentShirtColor} canvasWidth = {this.state.canvasWidth} canvasHeight = {this.state.canvasHeight} front={this.state.front} back = {this.state.back} 
        
              logo1FrontStartingX = {this.state.logo1FrontStartingX} logo1FrontStartingY = {this.state.logo1FrontStartingY} logo1FrontWidth = {this.state.logo1FrontWidth} logo1FrontHeight = {this.state.logo1FrontHeight} currentLogoFront1={this.state.currentLogoFront1}  currentFontFront1={this.state.currentFontFront1} currentLogoTextFront1={this.state.currentLogoTextFront1} currentLogoTextColorFront1={this.state.currentLogoTextColorFront1} currentLogoTextStrokeFront1={this.state.currentLogoTextStrokeFront1} text1FrontStartingX = {this.state.text1FrontStartingX} text1FrontStartingY = {this.state.text1FrontStartingY} logoTextFontSizeFront1 = {this.state.logoTextFontSizeFront1}
                  
                  logo2FrontStartingX = {this.state.logo2FrontStartingX} logo2FrontStartingY = {this.state.logo2FrontStartingY} logo2FrontWidth = {this.state.logo2FrontWidth} logo2FrontHeight = {this.state.logo2FrontHeight} currentLogoFront2={this.state.currentLogoFront2}  currentFontFront2={this.state.currentFontFront2} currentLogoTextFront2={this.state.currentLogoTextFront2} currentLogoTextColorFront2={this.state.currentLogoTextColorFront2} currentLogoTextStrokeFront2={this.state.currentLogoTextStrokeFront2} text2FrontStartingX = {this.state.text2FrontStartingX} text2FrontStartingY = {this.state.text2FrontStartingY} logoTextFontSizeFront2 = {this.state.logoTextFontSizeFront2}

              logo3FrontStartingX = {this.state.logo3FrontStartingX} logo3FrontStartingY = {this.state.logo3FrontStartingY} logo3FrontWidth = {this.state.logo3FrontWidth} logo3FrontHeight = {this.state.logo3FrontHeight} currentLogoFront3={this.state.currentLogoFront3}  currentFontFront3={this.state.currentFontFront3} currentLogoTextFront3={this.state.currentLogoTextFront3} currentLogoTextColorFront3={this.state.currentLogoTextColorFront3} currentLogoTextStrokeFront3={this.state.currentLogoTextStrokeFront3} text3FrontStartingX = {this.state.text3FrontStartingX} text3FrontStartingY = {this.state.text3FrontStartingY} logoTextFontSizeFront3 = {this.state.logoTextFontSizeFront3}
                  
                  logo1BackStartingX = {this.state.logo1BackStartingX} logo1BackStartingY = {this.state.logo1BackStartingY} logo1BackWidth = {this.state.logo1BackWidth} logo1BackHeight = {this.state.logo1BackHeight} currentLogoBack1={this.state.currentLogoBack1}  currentFontBack1={this.state.currentFontBack1} currentLogoTextBack1={this.state.currentLogoTextBack1} currentLogoTextColorBack1={this.state.currentLogoTextColorBack1} currentLogoTextStrokeBack1={this.state.currentLogoTextStrokeBack1} text1BackStartingX = {this.state.text1BackStartingX} text1BackStartingY = {this.state.text1BackStartingY} logoTextFontSizeBack1 = {this.state.logoTextFontSizeBack1} 

              logo2BackStartingX = {this.state.logo2BackStartingX} logo2BackStartingY = {this.state.logo2BackStartingY} logo2BackWidth = {this.state.logo2BackWidth} logo2BackHeight = {this.state.logo2BackHeight} currentLogoBack2={this.state.currentLogoBack2}  currentFontBack2={this.state.currentFontBack2} currentLogoTextBack2={this.state.currentLogoTextBack2} currentLogoTextColorBack2={this.state.currentLogoTextColorBack2} currentLogoTextStrokeBack2={this.state.currentLogoTextStrokeBack2} text2BackStartingX = {this.state.text2BackStartingX} text2BackStartingY = {this.state.text2BackStartingY}  logoTextFontSizeBack2 = {this.state.logoTextFontSizeBack2} 

                  logo3BackStartingX = {this.state.logo3BackStartingX} logo3BackStartingY = {this.state.logo3BackStartingY} logo3BackWidth = {this.state.logo3BackWidth} logo3BackHeight = {this.state.logo3BackHeight} currentLogoBack3={this.state.currentLogoBack3}  currentFontBack3={this.state.currentFontBack3} currentLogoTextBack3={this.state.currentLogoTextBack3} currentLogoTextColorBack3={this.state.currentLogoTextColorBack3} currentLogoTextStrokeBack3={this.state.currentLogoTextStrokeBack3} text3BackStartingX = {this.state.text3BackStartingX} text3BackStartingY = {this.state.text3BackStartingY}  logoTextFontSizeBack3 = {this.state.logoTextFontSizeBack3}

              /> }/>
            </div>

      


            <div className = 'toolbarCol col s12 m12 l4'>
              <Route exact path ='/' exact render={() => <ToolBar 
              increaseLogoSize1Front = {this.increaseLogoSize1Front}
              increaseLogoSize2Front = {this.increaseLogoSize2Front}
              increaseLogoSize3Front = {this.increaseLogoSize3Front}
                
                decreaseLogoSize1Front = {this.decreaseLogoSize1Front}
                decreaseLogoSize2Front = {this.decreaseLogoSize2Front}
                decreaseLogoSize3Front = {this.decreaseLogoSize3Front}
      
              increaseLogoSize1Back = {this.increaseLogoSize1Back}
              increaseLogoSize2Back = {this.increaseLogoSize2Back}
              increaseLogoSize3Back = {this.increaseLogoSize3Back}
     
                decreaseLogoSize1Back = {this.decreaseLogoSize1Back}
                decreaseLogoSize2Back = {this.decreaseLogoSize2Back}
                decreaseLogoSize3Back = {this.decreaseLogoSize3Back}

              logoTextFrontActivate1 = {this.logoTextFrontActivate1}
              logoTextFrontActivate2 = {this.logoTextFrontActivate2}
              logoTextFrontActivate3 = {this.logoTextFrontActivate3}

                logoTextBackActivate1 = {this.logoTextBackActivate1}
                logoTextBackActivate2 = {this.logoTextBackActivate2}
                logoTextBackActivate3 = {this.logoTextBackActivate3}

              logoTextFrontActive1 = {this.state.logoTextFrontActive1}
              logoTextFrontActive2 = {this.state.logoTextFrontActive2}
              logoTextFrontActive3 = {this.state.logoTextFrontActive3}

                logoTextBackActive1 = {this.state.logoTextBackActive1}
                logoTextBackActive2= {this.state.logoTextBackActive2}
                logoTextBackActive3 = {this.state.logoTextBackActive3}

              logoTextBackgroundColorFront1 = {this.state.logoTextBackgroundColorFront1}
              logoTextBackgroundColorFront2 = {this.state.logoTextBackgroundColorFront2}
              logoTextBackgroundColorFront3 = {this.state.logoTextBackgroundColorFront3}

                logoTextBackgroundColorBack1 = {this.state.logoTextBackgroundColorBack1}
                logoTextBackgroundColorBack2 = {this.state.logoTextBackgroundColorBack2}
                logoTextBackgroundColorBack3 = {this.state.logoTextBackgroundColorBack3}

              changeCurrentLogoTextColorFront1={this.changeCurrentLogoTextColorFront1}
              changeCurrentLogoTextColorFront2={this.changeCurrentLogoTextColorFront2}
              changeCurrentLogoTextColorFront3={this.changeCurrentLogoTextColorFront3}

                changeCurrentLogoTextColorBack1={this.changeCurrentLogoTextColorBack1}
                changeCurrentLogoTextColorBack2={this.changeCurrentLogoTextColorBack2}
                changeCurrentLogoTextColorBack3={this.changeCurrentLogoTextColorBack3}

              changeCurrentLogoTextStrokeFront1={this.changeCurrentLogoTextStrokeFront1}
              changeCurrentLogoTextStrokeFront2={this.changeCurrentLogoTextStrokeFront2}
              changeCurrentLogoTextStrokeFront3={this.changeCurrentLogoTextStrokeFront3}

                changeCurrentLogoTextStrokeBack1={this.changeCurrentLogoTextStrokeBack1}
                changeCurrentLogoTextStrokeBack2={this.changeCurrentLogoTextStrokeBack2}
                changeCurrentLogoTextStrokeBack3={this.changeCurrentLogoTextStrokeBack3}
                  
              changeCurrentFontFront1={this.changeCurrentFontFront1}
              changeCurrentFontFront2={this.changeCurrentFontFront2}
              changeCurrentFontFront3={this.changeCurrentFontFront3}

                changeCurrentFontBack1={this.changeCurrentFontBack1}
                changeCurrentFontBack2={this.changeCurrentFontBack2}
                changeCurrentFontBack3={this.changeCurrentFontBack3}
            
              currentLogoFront1={this.state.currentLogoFront1}    increaseTextSizeFront1 = {this.increaseTextSizeFront1}  decreaseTextSizeFront1 = {this.decreaseTextSizeFront1} currentLogoTextFront1={this.state.currentLogoTextFront1} 
              changeCurrentLogoTextColorFront1={this.changeCurrentLogoTextColorFront1}
              changeCurrentLogoTextStrokeFront1={this.changeCurrentLogoTextStrokeFront1} 

                  currentLogoFront2={this.state.currentLogoFront2} 
                  increaseTextSizeFront2 = {this.increaseTextSizeFront2}  decreaseTextSizeFront2 = {this.decreaseTextSizeFront2}  currentLogoTextFront2={this.state.currentLogoTextFront2} 
                  changeCurrentLogoTextColorFront2={this.changeCurrentLogoTextColorFront2}
                  changeCurrentLogoTextStrokeFront2={this.changeCurrentLogoTextStrokeFront2} 

              currentLogoFront3={this.state.currentLogoFront3} increaseTextSizeFront3 = {this.increaseTextSizeFront3}  decreaseTextSizeFront3 = {this.decreaseTextSizeFront3}  currentLogoTextFront3={this.state.currentLogoTextFront3} 
              changeCurrentLogoTextColorFront3={this.changeCurrentLogoTextColorFront3}
              changeCurrentLogoTextStrokeFront3={this.changeCurrentLogoTextStrokeFront3} 

                  currentLogoBack1={this.state.currentLogoBack1} increaseTextSizeBack1 = {this.increaseTextSizeBack1}  decreaseTextSizeBack1 = {this.decreaseTextSizeBack1}  currentLogoTextBack1={this.state.currentLogoTextBack1}  changeCurrentLogoTextColorBack1={this.changeCurrentLogoTextColorBack1}
                  changeCurrentLogoTextStrokeBack1={this.changeCurrentLogoTextStrokeBack1} 

              currentLogoBack2={this.state.currentLogoBack2} increaseTextSizeBack2 = {this.increaseTextSizeBack2}  decreaseTextSizeBack2 = {this.decreaseTextSizeBack2} currentLogoTextBack2={this.state.currentLogoTextBack2} changeCurrentLogoTextColorBack2={this.changeCurrentLogoTextColorBack2}
              changeCurrentLogoTextStrokeBack2={this.changeCurrentLogoTextStrokeBack2} 

                currentLogoBack3={this.state.currentLogoBack3} increaseTextSizeBack3 = {this.increaseTextSizeBack3}  decreaseTextSizeBack3 = {this.decreaseTextSizeBack3} currentLogoTextBack3={this.state.currentLogoTextBack3} changeCurrentLogoTextColorBack3={this.changeCurrentLogoTextColorBack3}
                changeCurrentLogoTextStrokeBack3={this.changeCurrentLogoTextStrokeBack3} 
  
              colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor}  currentFontBack1={this.state.currentFontBack1} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} currentLogoTextStrokeFront1={this.state.currentLogoTextStrokeFront1} 
                  
                changeCurrentShirtColor={this.changeCurrentShirtColor} deleteColor = {this.deleteColor} deleteLogo = {this.deleteLogo} getColors = {this.getColors} getLogos = {this.getLogos} logos = {this.state.logos} fonts = {this.state.fonts}  logoTextColor={this.state.logoTextColor}  changeCurrentLogoFront={this.changeCurrentLogoFront} changeCurrentFontFront={this.changeCurrentFontFront}  handleLogoTextSubmitAppFront={this.handleLogoTextSubmitAppFront} logoTextColor={this.state.logoTextColor}  changeCurrentLogoBack={this.changeCurrentLogoBack} handleLogoTextSubmitAppBack={this.handleLogoTextSubmitAppBack}  frontOfShirt={this.frontOfShirt} backOfShirt = {this.backOfShirt} frontOfShirtBackgroundColor={this.state.frontOfShirtBackgroundColor} backOfShirtBackgroundColor={this.state.backOfShirtBackgroundColor} 
                
              logoTextFillToggle={this.state.logoTextFillToggle} logoTextStrokeToggle={this.state.logoTextStrokeToggle} toggleLogoTextStroke={this.toggleLogoTextStroke} toggleLogoTextFill={this.toggleLogoTextFill} logoFillToggleBackgroundColor = {this.state.logoFillToggleBackgroundColor} logoStrokeToggleBackgroundColor = {this.state.logoStrokeToggleBackgroundColor} clearLogoTextStroke = {this.clearLogoTextStroke}  />}/>
  
 </div>

          </div>

            <Route exact path ='/newShirt' exact render={() => <NewColor handleAddColor={this.handleAddColor} getColors={this.getColors}/>}/>

            <Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>}/>
            
            <Route exact path ='/newLogo' exact render={() => <NewLogo handleAddLogo={this.handleAddLogo} getLogos={this.getLogos} logos={this.state.logos}/>}/>
              
            <Route exact path ='/pricingFormula' exact render={() => <PricingFormula getPrices={this.getPrices} prices={this.state.prices} handlePriceSubmitApp={this.handlePriceSubmitApp} handlePriceSubmitEmbroideryApp={this.handlePriceSubmitEmbroideryApp} printSideOneCostApp={this.state.printSideOneCostApp} printSideTwoCostApp={this.state.printSideTwoCostApp} 
          lightShirtPricing={this.lightShirtPricing} darkShirtPricing={this.darkShirtPricing} embroideryPricing={this.embroideryPricing} currentPricingType={this.state.currentPricingType} lightShirtBackgroundColor={this.state.lightShirtBackgroundColor} darkShirtBackgroundColor={this.state.darkShirtBackgroundColor} embroideryBackgroundColor={this.state.embroideryBackgroundColor} lightOrDarkPricing={this.state.lightOrDarkPricing} location1EmbroideryCost={this.state.location1EmbroideryCost} location2EmbroideryCost={this.state.location2EmbroideryCost} location3EmbroideryCost={this.state.location3EmbroideryCost} location4EmbroideryCost={this.state.location4EmbroideryCost} location5EmbroideryCost={this.state.location5EmbroideryCost} location6EmbroideryCost={this.state.location6EmbroideryCost}/>}/>

        </div>

      </Router>
    );
  }
}

export default App;