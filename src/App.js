import React, { Component } from 'react';
import First from './components/First.js'
import ToolBar from './components/ToolBar.js'
import NewForm from './components/NewForm.js'
// import UpdateForm from './components/UpdateForm.js'
import './App.css';

let baseURL = 'http://localhost:3000'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shirtFillColor: 'pink',
      shirtStrokeColor: 'purple',
      logo1FillColor: 'yellow',
      logo2FillColor: 'red',
      logo1TextColor: 'white',
      logo2TextColor: 'green',
      items: [],
      item: {},
      currentItem: []
    }

  this.deleteItem = this.deleteItem.bind(this)
   this.getItem = this.getItem.bind(this)
   this.getItems = this.getItems.bind(this)
   this.handleAddItem = this.handleAddItem.bind(this)
   this.handleEditItem = this.handleAddItem.bind(this)
  }
  componentDidMount(){
    this.getItems()
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
    fetch('/users/')                                        
    .then(response => response.json())                                            
    .then(json => console.log(json))   
  
    .catch(err => console.log(err))
    return (
      <div className="app row">
      <div className = 'first col'>
        <First shirtFillColor={this.state.shirtFillColor} logo1FillColor={this.state.logo1FillColor} logo2FillColor={this.state.logo2FillColor} logo1TextColor={this.state.logo1TextColor} logo2TextColor={this.state.logo2TextColor} shirtStrokeColor={this.state.shirtStrokeColor}/>
        </div>
        <div className = 'toolbar col'>
        <ToolBar />
       
        </div>
        <NewForm handleAddItem={this.state.handleAddItem} />
        
      </div>
    );
  }
}

export default App;