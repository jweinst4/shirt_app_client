import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';


import NewColor from './components/NewColor.js'
import NewUser from './components/NewUser.js'
import NewLogo from './components/NewLogo.js'
import ToolBar from './components/ToolBar.js'
import Canvas from './components/Canvas.js'
import Test from './components/Test.js'
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
      currentFontFront: 'Arial',
      currentLogoTextFront: '',
      currentLogoTextColorFront: 'Black',

      currentLogoBack: '',
      currentFontBack: 'Arial',
      currentLogoTextBack: '',
      currentLogoTextColorBack: 'Black',

      printSideOneCostApp: '',
      printSideTwoCostApp: '',
      lessThan12: [2.25,3.25,4.75,5.75,6.50],
      lessThan37: [1.75,2.85,3.85,4.80,6.25],
      lessThan73:[1.05,2.10,2.85,3.30,4.10],
      lessThan144:[.85,1.75,2.10,2.40,3.00],
      lessThan289: [.80,1.15,1.55,1.90,2.20],
      lessThan500: [.60,.95,1.25,1.50,1.70],
      lessThan1000: [.50,.75,.90,1.10,1.30],
      lessThan5000: [.45,.55,.75,.90,1.10],
      moreThan5000: [.40,.50,.60,.75,1.00],

      lessThan12Dark: [2.75, 3.75, 5.25, 6.25, 7.00],
      lessThan37Dark: [2.15, 3.25, 4.25, 5.20, 6.65],
      lessThan73Dark:[1.35, 2.40, 3.15, 3.60, 4.40],
      lessThan144Dark:[1.10, 2.00, 2.35, 2.65, 3.25],
      lessThan289Dark: [.80, 1.15, 1.55, 1.90, 2.20],
      lessThan500Dark: [.60, .95, 1.25, 1.50, 1.70],
      lessThan1000Dark: [.50, .75, .90, 1.10, 1.30],
      lessThan5000Dark: [.45, .55, .75, .90, 1.10],
      moreThan5000Dark: [.40, .50, .60, .75, 1.00],



      currentPricingType: 'lightShirt',
      lightShirtBackgroundColor: '#e3f2fd',
      darkShirtBackgroundColor: 'white',
      embroideryBackgroundColor: 'white',

      frontOfShirtBackgroundColor: '#e3f2fd',
      backOfShirtBackgroundColor: 'white',
      frontOrBack: 'front',
      front: true,
      back: false,

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

  this.changeCurrentLogoBack= this.changeCurrentLogoBack.bind(this)
  this.changeCurrentFontBack= this.changeCurrentFontBack.bind(this)
  this.changeCurrentLogoTextColorBack= this.changeCurrentLogoTextColorBack.bind(this)

  this.getPrices = this.getPrices.bind(this)

  this.handlePriceSubmitApp = this.handlePriceSubmitApp.bind(this)
  this.handlePriceSubmitAppDark = this.handlePriceSubmitAppDark.bind(this)

  this.handleLogoTextSubmitAppFront = this.handleLogoTextSubmitAppFront.bind(this)
  this.handleLogoTextSubmitAppBack = this.handleLogoTextSubmitAppBack.bind(this)

  this.frontOfShirt = this.frontOfShirt.bind(this)
  this.backOfShirt = this.backOfShirt.bind(this)

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
    
  }

  darkShirtPricing() {
    this.setState({currentPricingType: 'darkShirt'})  
    this.setState({lightShirtBackgroundColor: 'white'})
    this.setState({darkShirtBackgroundColor: '#e3f2fd'})
    this.setState({embroideryBackgroundColor: 'white'})  
  }

  embroideryPricing() {
    this.setState({currentPricingType: 'embroidery'})  
    this.setState({lightShirtBackgroundColor: 'white'})
    this.setState({darkShirtBackgroundColor: 'white'})
    this.setState({embroideryBackgroundColor: '#e3f2fd'})  
  }


 changeCurrentShirtColor(item) {
      this.setState ({currentShirtColor: item})
    }


changeCurrentLogoFront(item) {
  console.log(item)
    this.setState ({currentLogoFront: item.name})
    console.log(this.state.currentLogoFront)
    console.log(this.state.currentLogoBack)
  }
    
changeCurrentLogoBack(item) {
  this.setState ({currentLogoBack: item.name})
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

    if(quantity < 12) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan12[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan12[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan12[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan12[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan12[4]})
      }
    }

    else if(quantity < 37) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan37[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan37[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan37[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan37[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan37[4]})
      }
    }

    else if(quantity < 73) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan73[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan73[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan73[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan73[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan73[4]})
      }
    }

    else if(quantity < 144) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan144[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan144[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan144[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan144[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan144[4]})
      }
    }

    else if(quantity < 289) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan289[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan289[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan289[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan289[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan289[4]})
      }
    }

    else if(quantity < 500) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan500[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan500[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan500[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan500[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan500[4]})
      }
    }

    else if(quantity < 1000) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[4]})
      }
    }

    else if(quantity < 5000) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.lessThan5000[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.lessThan5000[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.lessThan5000[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan5000[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.lessThan5000[4]})
      }
    }

    else if(quantity >= 5000) {
      if (printSideOneQuantity === 1) {
        this.setState({printSideOneCostApp: this.state.moreThan5000[0]})
      }
      else if (printSideOneQuantity === 2) {
        this.setState({printSideOneCostApp: this.state.moreThan5000[1]})
      }
      else if (printSideOneQuantity === 3) {
        this.setState({printSideOneCostApp: this.state.moreThan5000[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.moreThan5000[3]})
      }
      else if (printSideOneQuantity === 5) {
        this.setState({printSideOneCostApp: this.state.moreThan5000[4]})
      }
    }

    else {

    }





    if(quantity < 12) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan12[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan12[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan12[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan12[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan12[4]})
      }
    }

    else if(quantity < 37) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan37[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan37[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan37[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan37[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan37[4]})
      }
    }

    else if(quantity < 73) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan73[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan73[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan73[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan73[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan73[4]})
      }
    }

    else if(quantity < 144) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan144[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan144[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan144[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan144[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan144[4]})
      }
    }

    else if(quantity < 289) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan289[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan289[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan289[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan289[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan289[4]})
      }
    }

    else if(quantity < 500) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan500[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan500[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan500[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan500[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan500[4]})
      }
    }

    else if(quantity < 1000) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan1000[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan1000[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan1000[2]})
      }
      else if (printSideOneQuantity === 4) {
        this.setState({printSideOneCostApp: this.state.lessThan1000[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan1000[4]})
      }
    }

    else if(quantity < 5000) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.lessThan5000[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.lessThan5000[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.lessThan5000[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.lessThan5000[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.lessThan5000[4]})
      }
    }

    else if(quantity >= 5000) {
      if (printSideTwoQuantity === 1) {
        this.setState({printSideTwoCostApp: this.state.moreThan5000[0]})
      }
      else if (printSideTwoQuantity === 2) {
        this.setState({printSideTwoCostApp: this.state.moreThan5000[1]})
      }
      else if (printSideTwoQuantity === 3) {
        this.setState({printSideTwoCostApp: this.state.moreThan5000[2]})
      }
      else if (printSideTwoQuantity === 4) {
        this.setState({printSideTwoCostApp: this.state.moreThan5000[3]})
      }
      else if (printSideTwoQuantity === 5) {
        this.setState({printSideTwoCostApp: this.state.moreThan5000[4]})
      }
    }

    else {
      
    }
  

    }

    handlePriceSubmitAppDark(quantity,printSideOneQuantity,printSideTwoQuantity) {

      if(quantity < 12) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan12Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan12Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan12Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan12Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan12Dark[4]})
        }
      }
  
      else if(quantity < 37) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan37Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan37Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan37Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan37Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan37Dark[4]})
        }
      }
  
      else if(quantity < 73) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan73Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan73Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan73Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan73Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan73Dark[4]})
        }
      }
  
      else if(quantity < 144) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan144Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan144Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan144Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan144Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan144Dark[4]})
        }
      }
  
      else if(quantity < 289) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan289Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan289Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan289Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan289Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan289Dark[4]})
        }
      }
  
      else if(quantity < 500) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan500Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan500Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan500Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan500Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan500Dark[4]})
        }
      }
  
      else if(quantity < 1000) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[4]})
        }
      }
  
      else if(quantity < 5000) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.lessThan5000Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.lessThan5000Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.lessThan5000Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan5000Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.lessThan5000Dark[4]})
        }
      }
  
      else if(quantity >= 5000) {
        if (printSideOneQuantity === 1) {
          this.setState({printSideOneCostApp: this.state.moreThan5000Dark[0]})
        }
        else if (printSideOneQuantity === 2) {
          this.setState({printSideOneCostApp: this.state.moreThan5000Dark[1]})
        }
        else if (printSideOneQuantity === 3) {
          this.setState({printSideOneCostApp: this.state.moreThan5000Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.moreThan5000Dark[3]})
        }
        else if (printSideOneQuantity === 5) {
          this.setState({printSideOneCostApp: this.state.moreThan5000Dark[4]})
        }
      }
  
      else {
  
      }
  
  
  
  
  
      if(quantity < 12) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan12Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan12Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan12Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan12Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan12Dark[4]})
        }
      }
  
      else if(quantity < 37) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan37Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan37Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan37Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan37Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan37Dark[4]})
        }
      }
  
      else if(quantity < 73) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan73Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan73Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan73Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan73Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan73Dark[4]})
        }
      }
  
      else if(quantity < 144) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan144Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan144Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan144Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan144Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan144Dark[4]})
        }
      }
  
      else if(quantity < 289) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan289Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan289Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan289Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan289Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan289Dark[4]})
        }
      }
  
      else if(quantity < 500) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan500Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan500Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan500Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan500Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan500Dark[4]})
        }
      }
  
      else if(quantity < 1000) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan1000Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan1000Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan1000Dark[2]})
        }
        else if (printSideOneQuantity === 4) {
          this.setState({printSideOneCostApp: this.state.lessThan1000Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan1000Dark[4]})
        }
      }
  
      else if(quantity < 5000) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.lessThan5000Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.lessThan5000Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.lessThan5000Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.lessThan5000Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.lessThan5000Dark[4]})
        }
      }
  
      else if(quantity >= 5000) {
        if (printSideTwoQuantity === 1) {
          this.setState({printSideTwoCostApp: this.state.moreThan5000Dark[0]})
        }
        else if (printSideTwoQuantity === 2) {
          this.setState({printSideTwoCostApp: this.state.moreThan5000Dark[1]})
        }
        else if (printSideTwoQuantity === 3) {
          this.setState({printSideTwoCostApp: this.state.moreThan5000Dark[2]})
        }
        else if (printSideTwoQuantity === 4) {
          this.setState({printSideTwoCostApp: this.state.moreThan5000Dark[3]})
        }
        else if (printSideTwoQuantity === 5) {
          this.setState({printSideTwoCostApp: this.state.moreThan5000Dark[4]})
        }
      }
  
      else {
        
      }
    
  
      }


  render() {

    return (

      <Router>

        <div className = 'appContainer row'>
            <div className = 'navBar col s12 m12 l12'>

              <div className = 'topCol col'>
              <Link to={'/'}>Home</Link>
              </div>

              <div className = 'topCol col'>
              <Link to={'/newShirt'}>NewShirt</Link>
              </div>

              <div className = 'topCol col'>
              <Link to={'/newUser'}>NewUser</Link>
              </div>

              <div className = 'topCol col'>
              <Link to={'/newLogo'}>NewLogo</Link>
              </div>

              <div className = 'topCol col'>
              <Link to={'/pricingFormula'}>PricingFormula</Link>
              </div>

              <div className = 'topCol col'>
              <Link to={'/test'}>Test</Link>
              </div>

            </div>


          <div className = 'canvasToolbarRow row'>

            <div className = 'canvasCol col s6 m6 l6'>
              <Route exact path ='/' exact render={() => <Canvas currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront={this.state.currentLogoFront} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back}/>}/>
            </div>

            <div className = 'toolbarCol col s6 m6 l6'>
              <Route exact path ='/' exact render={() => <ToolBar  currentShirtColor={this.state.shirtFillColor}changeCurrentShirtColor={this.changeCurrentShirtColor} colors={this.state.colors}  deleteColor = {this.deleteColor}  deleteUser = {this.deleteUser} deleteLogo = {this.deleteLogo} getColors = {this.getColors} getLogos = {this.getLogos} users = {this.state.users} logos = {this.state.logos} fonts = {this.state.fonts}  logoTextColor={this.state.logoTextColor}  changeCurrentLogoFront={this.changeCurrentLogoFront} changeCurrentFontFront={this.changeCurrentFontFront}  handleLogoTextSubmitAppFront={this.handleLogoTextSubmitAppFront} logoTextColor={this.state.logoTextColor} changeCurrentLogoTextColorFront={this.changeCurrentLogoTextColorFront} changeCurrentLogoBack={this.changeCurrentLogoBack} changeCurrentFontBack={this.changeCurrentFontBack}  handleLogoTextSubmitAppBack={this.handleLogoTextSubmitAppBack} changeCurrentLogoTextColorBack={this.changeCurrentLogoTextColorBack} frontOfShirt={this.frontOfShirt} backOfShirt = {this.backOfShirt} frontOfShirtBackgroundColor={this.state.frontOfShirtBackgroundColor} backOfShirtBackgroundColor={this.state.backOfShirtBackgroundColor} frontOrBack={this.state.frontOrBack}/>}/>
            </div>

          </div>

            <Route exact path ='/newShirt' exact render={() => <NewColor handleAddColor={this.handleAddColor} getColors={this.getColors}/>}/>

            <Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>}/>
            
            <Route exact path ='/newLogo' exact render={() => <NewLogo handleAddLogo={this.handleAddLogo} getLogos={this.getLogos} logos={this.state.logos}/>}/>
              
            <Route exact path ='/pricingFormula' exact render={() => <PricingFormula getPrices={this.getPrices} prices={this.state.prices} handlePriceSubmitApp={this.handlePriceSubmitApp} handlePriceSubmitAppDark={this.handlePriceSubmitAppDark} printSideOneCostApp={this.state.printSideOneCostApp} printSideTwoCostApp={this.state.printSideTwoCostApp} 
          lightShirtPricing={this.lightShirtPricing} darkShirtPricing={this.darkShirtPricing} embroideryPricing={this.embroideryPricing} currentPricingType={this.state.currentPricingType} lightShirtBackgroundColor={this.state.lightShirtBackgroundColor} darkShirtBackgroundColor={this.state.darkShirtBackgroundColor} embroideryBackgroundColor={this.state.embroideryBackgroundColor}/>}/>


<div className = 'canvasCol col s12 m12 l12'>

<Route exact path ='/test' exact render={() => <Test currentShirtColor={this.state.currentShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} changeCurrentShirtColor={this.changeCurrentShirtColor} currentLogoFront={this.state.currentLogoFront} currentFontFront={this.state.currentFontFront} currentLogoTextFront={this.state.currentLogoTextFront} currentLogoTextColorFront={this.state.currentLogoTextColorFront} currentLogoBack={this.state.currentLogoBack} currentFontBack={this.state.currentFontBack} currentLogoTextBack={this.state.currentLogoTextBack} currentLogoTextColorBack={this.state.currentLogoTextColorBack} frontOrBack={this.state.frontOrBack} front={this.state.front} back = {this.state.back}/>}/>
</div>

        </div>

      </Router>
    );
  }
}

export default App;