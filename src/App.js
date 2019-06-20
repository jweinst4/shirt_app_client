import React, { Component } from 'react';
import First from './components/First.js'
import NewColor from './components/NewColor.js'
import NewForm from './components/NewForm.js'
import NewLogo from './components/NewLogo.js'
import ToolBar from './components/ToolBar.js'

import './App.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}

console.log('current base URL:', baseURL)

class App extends Component {

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
      users: [],
      user: {},
      currentLogo: '',
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

  render() {

    return (
      <div className="app row">
      <div className = 'first col'>
      <div className = 'row new-item-row'>
    <div className = 'col new-item-col'>
      <NewColor handleAddColor={this.handleAddColor} getColors={this.getColors}/>
      </div>
      <div className = 'col new-item-col'>
      <NewForm handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>
      </div>
      <div className = 'col new-item-col'>
      <NewLogo handleAddLogo={this.handleAddLogo} getLogos={this.getLogos}/>
      </div>
      </div>

      <First shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor} changeShirtColor={this.changeShirtColor} colors={this.state.colors} shirtStrokeColor={this.state.shirtStrokeColor} currentLogo={this.state.currentLogo}/>


        </div>
        <div className = 'toolbar col'>
        <ToolBar  shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor}changeShirtColor={this.changeShirtColor} changeLogo1Color={this.changeLogo1Color} changeLogo2Color={this.changeLogo2Color} colors={this.state.colors}  logoFillColors= {this.state.logoFillColors} deleteColor = {this.deleteColor}  deleteUser = {this.deleteUser} deleteLogo = {this.deleteLogo} getColors = {this.getColors} users = {this.state.users} logos = {this.state.logos} changeCurrentLogo={this.changeCurrentLogo}/>

      
  
       
        </div>
       
        
      </div>
    );
  }
}

export default App;