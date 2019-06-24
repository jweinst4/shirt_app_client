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



class NewColor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: [],
           name: '',
        }
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleColorSubmit = this.handleColorSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getColors()
    }
    handleColorChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleColorSubmit(event) {
        event.preventDefault()
    
        fetch(baseURL + '/colors', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddColor(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({name: ''})
    }

    render() {
        return (

           
         <form className = 'col s12 m12 l12' onSubmit={this.handleColorSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="name">Shirt URL:</label>
                <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleColorChange} value={this.state.name}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Add a Shirt"/>
                </div>
              
             
            </form>
        )
    }
}

export default NewColor
