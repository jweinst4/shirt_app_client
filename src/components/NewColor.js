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
        
    }

    render() {
        return (

            
            <div className = "newColor">

            <form className = 'newColor' onSubmit={this.handleColorSubmit}>

            <div className = 'newColorItem'>
            <label htmlFor="name"><div className = "newColorText">NewShirtURL: </div></label>
                <input type="text" id="name" name="name" onChange={this.handleColorChange} value={this.state.name}  />    
                </div>                        

                <div className = 'newColorItem'>
                <input type="submit" value="Add a Shirt URL" />
                </div>
            </form>

           
            </div>
         
        )
    }
}

export default NewColor
