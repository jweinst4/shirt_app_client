import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';


import NewColor from './components/NewColor.js'
import NewUser from './components/NewUser.js'
import NewLogo from './components/NewLogo.js'
import ToolBar from './components/ToolBar.js'
import Canvas from './components/Canvas.js'
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
      shirtStrokeColor: 'black',
      logo1FillColor: 'blue',
      logo2FillColor: 'yellow',
      logo1TextColor: 'blue',
      logo2TextColor: 'white',
      shirtFillColor: 'pink',
      logoFillColors: ['pink','yellow','blue','red','white','black'],
      textColors: ['pink','yellow','blue','red','white','black'],
      items: [],
      item: {},
      colors: [],
      color: {},
      logos: [],
      logo: {},
      prices: [],
      price: {},
      users: [],
      user: {},
      currentLogo: '',
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
      moreThan5000: [.40,.50,.60,.75,1.00]

    }



 
    
  this.deleteColor = this.deleteColor.bind(this)
  this.getColors = this.getColors.bind(this)
  this.handleAddColor = this.handleAddColor.bind(this)

  this.deleteUser = this.deleteUser.bind(this)
  this.getUsers = this.getUsers.bind(this)
  this.handleAddUser = this.handleAddUser.bind(this)

  this.deleteLogo = this.deleteLogo.bind(this)
  this.getLogos = this.getLogos.bind(this)
  this.handleAddLogo = this.handleAddLogo.bind(this)

  this.changeShirtColor= this.changeShirtColor.bind(this)
  this.changeLogo1Color= this.changeLogo1Color.bind(this)
  this.changeLogo2Color= this.changeLogo2Color.bind(this)

  this.changeCurrentLogo= this.changeCurrentLogo.bind(this)

  this.getPrices = this.getPrices.bind(this)

  this.handlePriceSubmitApp = this.handlePriceSubmitApp.bind(this)

  }
 changeShirtColor(item) {
      this.setState ({shirtFillColor: item.name})
    }


    changeCurrentLogo(item) {
      this.setState ({currentLogo: item.name})
    }

    changeLogo1Color(item) {
      this.setState ({logo1FillColor: item})
    }

    changeLogo2Color(item) {
      this.setState ({logo2FillColor: item})
    }



  handleAddColor(color) {
  
    this.getColors()
    const copyColors = [...this.state.colors]
    copyColors.unshift(color.name)
    this.setState({
      colors: copyColors,
      name: ''
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
       .then(parsedData => this.setState({shirtFillColor: this.state.colors[0].name}),
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

</div>


<div className = 'canvasToolbarRow row'>

<div className = 'canvasCol col s6 m6 l6'>


<Route exact path ='/' exact render={() => <Canvas shirtFillColor={this.state.shirtFillColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} currentLogo={this.state.currentLogo} changeShirtColor={this.changeShirtColor}/>}/>
</div>




<div className = 'toolbarCol col s6 m6 l6'>
<Route exact path ='/' exact render={() => <ToolBar  shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor}changeShirtColor={this.changeShirtColor} changeLogo1Color={this.changeLogo1Color} changeLogo2Color={this.changeLogo2Color} colors={this.state.colors}  logoFillColors= {this.state.logoFillColors} deleteColor = {this.deleteColor}  deleteUser = {this.deleteUser} deleteLogo = {this.deleteLogo} getColors = {this.getColors} getLogos = {this.getLogos} users = {this.state.users} logos = {this.state.logos} changeCurrentLogo={this.changeCurrentLogo}/>}/>
</div>

</div>



    <Route exact path ='/newShirt' exact render={() => <NewColor handleAddColor={this.handleAddColor} getColors={this.getColors}/>}/>



 
     
    <Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>}/>
     
      
    <Route exact path ='/newLogo' exact render={() => <NewLogo handleAddLogo={this.handleAddLogo} getLogos={this.getLogos} logos={this.state.logos}/>}/>
      
    <Route exact path ='/pricingFormula' exact render={() => <PricingFormula getPrices={this.getPrices} prices={this.state.prices} handlePriceSubmitApp={this.handlePriceSubmitApp} printSideOneCostApp={this.state.printSideOneCostApp} printSideTwoCostApp={this.state.printSideTwoCostApp} />}/>
           
    </div>

      </Router>
    );
  }
}

export default App;