import React, { Component } from 'react';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}



class NewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logos: [],
           name: '',
        user_id: '',
        }
        this.handleLogoChange = this.handleLogoChange.bind(this)
        this.handleLogoSubmit = this.handleLogoSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getLogos()
    }

    handleLogoChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
        
    }

    handleLogoSubmit(event) {
        
        event.preventDefault()
        fetch(baseURL + '/logos', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                user_id: this.state.user_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            
            this.props.handleAddLogo(resJSON)
            this.setState({
                name: '',
               user_id: '',
            })
        }).catch(error => console.error({ 'Error': error }))
        
    }

    render() {
        return (
            <div className = "valign-wrapper">
            
            <form className = 'newLogo' onSubmit={this.handleLogoSubmit}>

            <div className = 'newLogoItem'>
            <label htmlFor="name"><span className = "newLogoText">Logo URL: </span></label>
                <input type="text" id="name" name="name" onChange={this.handleLogoChange} value={this.state.name}  />  
                </div>   

                <div className = 'newLogoItem'>
                <label htmlFor="user_id"><span className = "newLogoText">user_id: </span></label>
                <input type="number" id="user_id" name="user_id" onChange={this.handleLogoChange} value={this.state.user_id}  />     
                </div>

             
                <input type="submit" value="Add a Logo" id = 'logoInput' />
           
            </form>
 

           
            </div>
         
        )
    }
}

export default NewForm
