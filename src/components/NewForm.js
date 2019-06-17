import React from 'react'

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3001'
} else {
  baseURL = 'https://awesome-app-client.herokuapp.com/'
}



class NewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
           name: '',
           age: '',
           size: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event) {
        event.preventDefault()
    
        fetch(baseURL + 'users', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                age:this.state.age,
                size:this.state.size,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddItem(resJSON)
            this.setState({
                name: '',
               age: '',
               size: ''    
            })
           
        }).catch(error => console.error({ 'Error': error }))
        
    }
    render() {
        return (
            <div className = "valign-wrapper">
            <form className = 'newForm' onSubmit={this.handleSubmit}>
               <label htmlFor="name"><span className = "newFormText">Name: </span></label>
                <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name}  />

                <label htmlFor="age"><span className = "newFormText">Age: </span></label>
                <input type="text" id="age" name="age" onChange={this.handleChange} value={this.state.age}  />

                <label htmlFor="size"><span className = "newFormText">Size: </span></label>

                <input type="text" id="size" name="size" onChange={this.handleChange} value={this.state.size} />

                <input type="submit" value="Add a Case" />
            </form>
            </div>
        )
    }
}

export default NewForm
