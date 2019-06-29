import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import NewColor from './components/NewColor.js'
import NewUser from './components/NewUser.js'
import NewLogo from './components/NewLogo.js'
import ToolBar from './components/ToolBar.js'
import Canvas from './components/Canvas.js'
import ShirtTest from './components/ShirtTest.js'
import LogoTest1 from './components/LogoTest1.js'
import LogoTest2 from './components/LogoTest2.js'
import LogoTest3 from './components/LogoTest3.js'
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

      currentLogoFront: '',
      currentLogoFront2: '',
      currentLogoFront3: '',
      currentFontFront: 'Arial',
      currentLogoTextFront: '',
      currentLogoTextColorFront: 'Black',
      currentLogoTextStrokeFront: '',

      currentLogoBack: '',
      currentLogoBack2: '',
      currentLogoBack3: '',
      currentFontBack: 'Arial',
      currentLogoTextBack: '',
      currentLogoTextColorBack: 'Black',
      currentLogoTextStrokeBack: '',

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


    
      currentPricingType: 'lightShirt',
      lightShirtBackgroundColor: '#e3f2fd',
      darkShirtBackgroundColor: 'white',
      embroideryBackgroundColor: 'white',
      lightOrDarkPricing: true,
      embroideryPricing: false,
      logoTextFillToggle: true,
      logoTextStrokeToggle: false,
      logoFillToggleBackgroundColor: '#e3f2fd',
      logoStrokeToggleBackgroundColor: 'white',
  

      frontOfShirtBackgroundColor: '#e3f2fd',
      backOfShirtBackgroundColor: 'white',
      frontOrBack: 'front',
      front: true,
      back: false,

      logoFillToggleBackgroundColor: '#e3f2fd',
      logoStrokeToggleBackgroundColor: 'white',

      shirtRatio: 1.25,
      canvasWidth: 560,
      canvasHeight: 670,
      shirtCanvasWidth: 560,
      shirtCanvasHeight: 670,
      shirtWidth: 560,
      shirtHeight: 670,
      logoWidth: 130,
      logoHeight: 45,
      logoWidth2: 130,
      logoHeight2: 45,
      logoWidth3: 130,
      logoHeight3: 45,
      logoCanvasWidth: 560,
      logoCanvasHeight: 670,
      logoTextFontSizeFront: 30,
      logoTextFontSizeBack: 30,
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

  this.changeCurrentShirtColor= this.changeCurrentShirtColor.bind(this)

  this.changeCurrentLogoFront= this.changeCurrentLogoFront.bind(this)
  this.changeCurrentFontFront= this.changeCurrentFontFront.bind(this)
  this.changeCurrentLogoTextColorFront= this.changeCurrentLogoTextColorFront.bind(this)
  this.changeCurrentLogoTextStrokeFront= this.changeCurrentLogoTextStrokeFront.bind(this)

  this.changeCurrentLogoBack= this.changeCurrentLogoBack.bind(this)
  this.changeCurrentFontBack= this.changeCurrentFontBack.bind(this)
  this.changeCurrentLogoTextColorBack= this.changeCurrentLogoTextColorBack.bind(this)
  this.changeCurrentLogoTextStrokeBack= this.changeCurrentLogoTextStrokeBack.bind(this)

  this.clearLogoTextStroke = this.clearLogoTextStroke.bind(this)

  this.getPrices = this.getPrices.bind(this)

  this.handlePriceSubmitApp = this.handlePriceSubmitApp.bind(this)
  this.handlePriceSubmitEmbroideryApp = this.handlePriceSubmitEmbroideryApp.bind(this)

  this.handleLogoTextSubmitAppFront = this.handleLogoTextSubmitAppFront.bind(this)
  this.handleLogoTextSubmitAppBack = this.handleLogoTextSubmitAppBack.bind(this)

  this.frontOfShirt = this.frontOfShirt.bind(this)
  this.backOfShirt = this.backOfShirt.bind(this)
  this.toggleLogoTextFill = this.toggleLogoTextFill.bind(this)
  this.toggleLogoTextStroke = this.toggleLogoTextStroke.bind(this)

  this.canvasTestButtonApp = this.canvasTestButtonApp.bind(this)


  this.increaseTextSizeFront = this.increaseTextSizeFront.bind(this)
  this.decreaseTextSizeFront = this.decreaseTextSizeFront.bind(this)




  this.increaseTextSizeBack = this.increaseTextSizeBack.bind(this)
  this.decreaseTextSizeBack = this.decreaseTextSizeBack.bind(this)

  }

  increaseTextSizeFront () {

    this.setState({logoTextFontSizeFront: this.state.logoTextFontSizeFront * 1.1})
  }

  decreaseTextSizeFront () {
    this.setState({logoTextFontSizeFront: this.state.logoTextFontSizeFront / 1.1})

  }


  increaseTextSizeBack () {

    this.setState({logoTextFontSizeBack: this.state.logoTextFontSizeBack * 1.1})
  }

  decreaseTextSizeBack () {
    this.setState({logoTextFontSizeBack: this.state.logoTextFontSizeBack / 1.1})

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



  canvasTestButtonApp(event) {
    this.setState({shirtCanvasWidth: 200});
    this.setState({shirtCanvasHeight: 240});
    this.setState({shirtWidth: 200});
    this.setState({shirtHeight: 240});

    this.setState({logoCanvasWidth: 200});
    this.setState({logoCanvasHeight: 240});
    this.setState({logoWidth: 46});
    this.setState({logotHeight: 16});

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

    if (!this.state.currentLogoFront) {
      console.log('a')
      this.setState ({currentLogoFront: item.name})
    }
    else if (!this.state.currentLogoFront2) {
      this.setState ({currentLogoFront2: item.name})
      console.log('b')
    }
    else if (!this.state.currentLogoFront3) {
      this.setState ({currentLogoFront3: item.name})
      console.log('c')
    }
    else {

    }
  }
  changeCurrentLogoBack(item) {

    if (!this.state.currentLogoBack) {
      this.setState ({currentLogoBack: item.name})
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

changeCurrentFontFront(item) {
    this.setState ({currentFontFront: item})
}

changeCurrentFontBack(item) {
  this.setState ({currentFontBack: item})
}


changeCurrentLogoTextColorFront(item) {

  this.setState ({currentLogoTextColorFront: item})
  }

  changeCurrentLogoTextColorBack(item) {

    this.setState ({currentLogoTextColorBack: item})
    }

    


changeCurrentLogoTextStrokeFront(item) {

  this.setState ({currentLogoTextStrokeFront: item})
  }

  changeCurrentLogoTextStrokeBack(item) {

    this.setState ({currentLogoTextStrokeBack: item})
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
    console.log(item)
      this.setState ({currentLogoTextFront: item})
  }

  handleLogoTextSubmitAppBack(item) {
    this.setState ({currentLogoTextBack: item})
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
              <Route exact path ='/' exact render={() => <Canvas currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront={this.state.currentLogoFront} currentLogoFront2={this.state.currentLogoFront2} currentLogoFront3={this.state.currentLogoFront3}currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentLogoBack2={this.state.currentLogoBack2} currentLogoBack3={this.state.currentLogoBack3} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} canvasWidth = {this.state.canvasWidth} canvasHeight = {this.state.canvasHeight} currentLogoTextStrokeFront={this.state.currentLogoTextStrokeFront} currentLogoTextStrokeBack={this.state.currentLogoTextStrokeBack} logoTextFontSizeFront = {this.state.logoTextFontSizeFront}  logoTextFontSizeBack = {this.state.logoTextFontSizeBack} />}/>
            </div>

            <div className = 'toolbarCol col s12 m12 l4'>
              <Route exact path ='/' exact render={() => <ToolBar  canvasTestButtonApp = {this.canvasTestButtonApp} currentShirtColor={this.state.shirtFillColor}changeCurrentShirtColor={this.changeCurrentShirtColor} colors={this.state.colors}  deleteColor = {this.deleteColor}  deleteUser = {this.deleteUser} deleteLogo = {this.deleteLogo} getColors = {this.getColors} getLogos = {this.getLogos} users = {this.state.users} logos = {this.state.logos} fonts = {this.state.fonts}  logoTextColor={this.state.logoTextColor}  changeCurrentLogoFront={this.changeCurrentLogoFront} changeCurrentFontFront={this.changeCurrentFontFront}  handleLogoTextSubmitAppFront={this.handleLogoTextSubmitAppFront} logoTextColor={this.state.logoTextColor} changeCurrentLogoTextColorFront={this.changeCurrentLogoTextColorFront} changeCurrentLogoBack={this.changeCurrentLogoBack} changeCurrentFontBack={this.changeCurrentFontBack}  handleLogoTextSubmitAppBack={this.handleLogoTextSubmitAppBack} changeCurrentLogoTextColorBack={this.changeCurrentLogoTextColorBack} frontOfShirt={this.frontOfShirt} backOfShirt = {this.backOfShirt} frontOfShirtBackgroundColor={this.state.frontOfShirtBackgroundColor} backOfShirtBackgroundColor={this.state.backOfShirtBackgroundColor} frontOrBack={this.state.frontOrBack}        logoTextFillToggle={this.state.logoTextFillToggle} logoTextStrokeToggle={this.state.logoTextStrokeToggle} toggleLogoTextStroke={this.toggleLogoTextStroke} toggleLogoTextFill={this.toggleLogoTextFill} logoFillToggleBackgroundColor = {this.state.logoFillToggleBackgroundColor} logoStrokeToggleBackgroundColor = {this.state.logoStrokeToggleBackgroundColor} changeCurrentLogoTextStrokeFront={this.changeCurrentLogoTextStrokeFront} changeCurrentLogoTextStrokeBack={this.changeCurrentLogoTextStrokeBack} clearLogoTextStroke = {this.clearLogoTextStroke} increaseTextSizeFront = {this.increaseTextSizeFront}  decreaseTextSizeFront = {this.decreaseTextSizeFront} increaseTextSizeBack = {this.increaseTextSizeBack}  decreaseTextSizeBack = {this.decreaseTextSizeBack} front = {this.state.front} back = {this.state.back} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextBack={this.state.currentLogoTextBack}/>}/>

      
 </div>

          </div>

            <Route exact path ='/newShirt' exact render={() => <NewColor handleAddColor={this.handleAddColor} getColors={this.getColors}/>}/>

            <Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>}/>
            
            <Route exact path ='/newLogo' exact render={() => <NewLogo handleAddLogo={this.handleAddLogo} getLogos={this.getLogos} logos={this.state.logos}/>}/>
              
            <Route exact path ='/pricingFormula' exact render={() => <PricingFormula getPrices={this.getPrices} prices={this.state.prices} handlePriceSubmitApp={this.handlePriceSubmitApp} handlePriceSubmitEmbroideryApp={this.handlePriceSubmitEmbroideryApp} printSideOneCostApp={this.state.printSideOneCostApp} printSideTwoCostApp={this.state.printSideTwoCostApp} 
          lightShirtPricing={this.lightShirtPricing} darkShirtPricing={this.darkShirtPricing} embroideryPricing={this.embroideryPricing} currentPricingType={this.state.currentPricingType} lightShirtBackgroundColor={this.state.lightShirtBackgroundColor} darkShirtBackgroundColor={this.state.darkShirtBackgroundColor} embroideryBackgroundColor={this.state.embroideryBackgroundColor} lightOrDarkPricing={this.state.lightOrDarkPricing} location1EmbroideryCost={this.state.location1EmbroideryCost} location2EmbroideryCost={this.state.location2EmbroideryCost} location3EmbroideryCost={this.state.location3EmbroideryCost} location4EmbroideryCost={this.state.location4EmbroideryCost} location5EmbroideryCost={this.state.location5EmbroideryCost} location6EmbroideryCost={this.state.location6EmbroideryCost}/>}/>



   <div className = 'shirtTest'>
    <Route exact path ='/shirtTest' exact render={() => <ShirtTest currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront={this.state.currentLogoFront} currentLogoFront2={this.state.currentLogoFront2} currentLogoFront3={this.state.currentLogoFront3} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} shirtCanvasWidth = {this.state.shirtCanvasWidth} shirtCanvasHeight = {this.state.shirtCanvasHeight} shirtWidth = {this.state.shirtWidth} shirtHeight={this.state.shirtHeight}/> }/>

    </div>



<div className = 'logoTest1'>
<Route exact path ='/shirtTest' exact render={() => <LogoTest1 currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront={this.state.currentLogoFront} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} shirtCanvasWidth = {this.state.shirtCanvasWidth} shirtCanvasHeight = {this.state.shirtCanvasHeight} shirtWidth = {this.state.shirtWidth} shirtHeight={this.state.shirtHeight} logoHeight = {this.state.logoHeight} logoWidth = {this.state.logoWidth} logoCanvasWidth = {this.state.logoCanvasWidth} logoCanvasHeight = {this.state.logoCanvasHeight}/> }/>
</div>

<div className = 'logoTest2'>
<Route exact path ='/shirtTest' exact render={() => <LogoTest2 currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront2={this.state.currentLogoFront2} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} shirtCanvasWidth = {this.state.shirtCanvasWidth} shirtCanvasHeight = {this.state.shirtCanvasHeight} shirtWidth = {this.state.shirtWidth} shirtHeight={this.state.shirtHeight} logoHeight = {this.state.logoHeight} logoWidth = {this.state.logoWidth} logoCanvasWidth = {this.state.logoCanvasWidth} logoCanvasHeight = {this.state.logoCanvasHeight}/> }/>
</div>

<div className = 'logoTest3'>
<Route exact path ='/shirtTest' exact render={() => <LogoTest3 currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront3={this.state.currentLogoFront3} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back} shirtCanvasWidth = {this.state.shirtCanvasWidth} shirtCanvasHeight = {this.state.shirtCanvasHeight} shirtWidth = {this.state.shirtWidth} shirtHeight={this.state.shirtHeight} logoHeight = {this.state.logoHeight} logoWidth = {this.state.logoWidth} logoCanvasWidth = {this.state.logoCanvasWidth} logoCanvasHeight = {this.state.logoCanvasHeight}/> }/>
</div>




        </div>

      </Router>
    );
  }
}

export default App;