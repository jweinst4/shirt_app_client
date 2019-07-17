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
           url: '',
           swatch: '',

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

        console.log(this.state.name)
        console.log(this.state.url)
        console.log(this.state.swatch)
    
        fetch(baseURL + '/colors', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                url: this.state.url,
                swatch: this.state.swatch,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            console.log(resJSON)
            this.handleAddColor(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({name: '',url: '',swatch: ''})
    }

    

    render() {
        return (

           
         <form className = 'col s12 m12 l12' onSubmit={this.handleColorSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="name">Shirt Color Name:</label>
                <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleColorChange} value={this.state.name}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="url">Shirt URL:</label>
                <input className = 'col s6 m6 l6' type="text" id="url" name="url" onChange={this.handleColorChange} value={this.state.url}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="swatch">Swatch URL:</label>
                <input className = 'col s6 m6 l6' type="text" id="swatch" name="swatch" onChange={this.handleColorChange} value={this.state.swatch}  />  
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
