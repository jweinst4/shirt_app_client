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



class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
           name: '',
            age: '',
           size: '',
        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handleUserSubmit = this.handleUserSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    handleUserChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
        
    }

    handleUserSubmit(event) {
        event.preventDefault()
        fetch(baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                age: this.state.age,
                size: this.state.size,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddUser(resJSON)
            this.setState({
                name: '',
               age: '',
               size: '',  
            })
        }).catch(error => console.error({ 'Error': error }))
        
    }

    render() {
        return (
            
         <form className = 'col s12 m12 l12' onSubmit={this.handleUserSubmit}>
         
         <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="name">UserName:</label>
             <input className = 'col s2 m2 l2' type="text" id="name" name="name" onChange={this.handleUserChange} value={this.state.name}  />  
             </div>   
             </div>

             <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="age">Age:</label>
             <input className = 'col s2 m2 l2' type="number" id="age" name="age" onChange={this.handleUserChange} value={this.state.age}  />  
             </div>   
             </div>

             <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="size">Size:</label>
             <input className = 'col s2 m2 l2' type="text" id="size" name="size" onChange={this.handleUserChange} value={this.state.size}  />  
             </div>   
             </div>


             <div className = 'form-row'>
             <input type="submit" value="Add a User"/>
             </div>
           
          
         </form>
        )
    }
}

export default NewUser
