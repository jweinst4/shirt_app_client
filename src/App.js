import React, { Component } from 'react';
import First from './components/First.js'
import ToolBar from './components/ToolBar.js'
import NewForm from './components/NewForm.js'
import NewColor from './components/NewColor.js'
// import UpdateForm from './components/UpdateForm.js'
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
      shirtFillColor: 'white',
      shirtStrokeColor: 'black',
      logo1FillColor: 'blue',
      logo2FillColor: 'yellow',
      logo1TextColor: 'blue',
      logo2TextColor: 'white',
      items: [],
      item: {},
      newColors: [],
      newColor: {},
      currentItem: [],
      colors: [],
      color: {},
      logoFillColors: ['pink','yellow','blue','red','white','black'],
      textColors: ['pink','yellow','blue','red','white','black']
    }

  this.deleteItem = this.deleteItem.bind(this)
  this.deleteColor = this.deleteColor.bind(this)
   this.getItem = this.getItem.bind(this)
   this.getItems = this.getItems.bind(this)
   this.getColor = this.getColor.bind(this)
   this.getColors = this.getColors.bind(this)
   this.handleAddItem = this.handleAddItem.bind(this)
   this.handleAddColor = this.handleAddColor.bind(this)
   this.handleEditItem = this.handleEditItem.bind(this)
   this.changeShirtColor= this.changeShirtColor.bind(this)
   this.changeLogo1Color= this.changeLogo1Color.bind(this)
   this.changeLogo2Color= this.changeLogo2Color.bind(this)
  }
  componentDidMount(){
    this.getItems()
    }

    changeShirtColor(item) {
      this.setState ({shirtFillColor: item.name})
    }

    changeLogo1Color(item) {
      this.setState ({logo1FillColor: item})
    }

    changeLogo2Color(item) {
      this.setState ({logo2FillColor: item})
    }
  
    deleteItem(id) {
    fetch(baseURL + '/users/' + id, {
      method: 'DELETE'
    })

      .then(response => {
        const findIndex = this.state.items.findIndex(item => item._id === id)
        const copyItems = [...this.state.items]
        copyItems.splice(findIndex, 1)
        this.setState({items: copyItems})
      })
  }
  
    handleAddItem(item) {
  
    const copyItems = [...this.state.items]
    copyItems.unshift(item)
    this.setState({
      items: copyItems,
      name: ''
    })
  
  }

  handleAddColor(color) {
    this.getColors()
    console.log(this.state.colors)
    const copyColors = [...this.state.colors]
    copyColors.unshift(color.name)
    this.setState({
      colors: copyColors,
      name: ''
    })
    console.log(this.state.colors)
  
  }

  deleteColor(id) {

    fetch(baseURL + '/colors/' + id, { method: 'DELETE' }).then(response => {
        const findIndex = this.state.colors.findIndex(color => color.id === id)
        const copyColors = [...this.state.colors]
        copyColors.splice(findIndex, 1)
        this.setState({ colors: copyColors })
        console.log(this.state.colors)
        this.setState({shirtFillColor: this.state.colors[0].name})
      
    })
    
}
    getItem(item) {
      this.setState({item: item})
    }
    
    getItems() {
     fetch(baseURL+ '/users')
       .then(data => {
         return data.json()},
         err => console.log(err))
       .then(parsedData => this.setState({items: parsedData}),
        err=> console.log(err))
   }

   getColors() {
    fetch(baseURL+ '/colors')
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({colors: parsedData}),
      
       err=> console.log(err))

  }

   getColor(color) {
    this.setState({color: color})
  }
   
handleEditItem(resJSON) {
  const copyEditItems = [...this.state.items]

  const findIndex = this.state.items.findIndex(item =>item._id === resJSON._id)
  copyEditItems[findIndex] = resJSON
  this.setState({
     items: copyEditItems
  })
  this.setState({ edit: false })
}
   
  render() {
    fetch(baseURL + '/users/')                                        
    .then(response => response.json())                                            
      .catch(err => console.log(err))

    fetch(baseURL + '/colors/')                                        
    .then(response => response.json())                                            
  
    .catch(err => console.log(err))
    return (
      <div className="app row">
      <div className = 'first col'>
      <NewForm handleAddItem={this.handleAddItem}/>
      <NewColor handleAddColor={this.handleAddColor}/>

     


        <First shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor} logo1TextColor={this.state.logo1TextColor} logo2TextColor={this.state.logo2TextColor} shirtStrokeColor={this.state.shirtStrokeColor} changeShirtColor={this.changeShirtColor} colors={this.state.colors}  logoFillColors= {this.state.logoFillColors}  textColors= {this.state.textColors}/>

        
        </div>
        <div className = 'toolbar col'>
        <ToolBar  shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor} logo1TextColor={this.state.logo1TextColor} logo2TextColor={this.state.logo2TextColor} shirtStrokeColor={this.state.shirtStrokeColor} changeShirtColor={this.changeShirtColor} changeLogo1Color={this.changeLogo1Color} changeLogo2Color={this.changeLogo2Color} colors={this.state.colors}  logoFillColors= {this.state.logoFillColors}  textColors= {this.state.textColors} deleteColor = {this.deleteColor}  getColors = {this.getColors}/>
       
        </div>
       
        
      </div>
    );
  }
}

export default App;