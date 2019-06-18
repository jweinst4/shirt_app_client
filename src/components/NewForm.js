import React from 'react'

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
            items: [],
           name: '',
           age: '',
           size: '',
           colorname: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleColorSubmit = this.handleColorSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleColorChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
        console.log(event)
    }

    handleSubmit(event) {
        event.preventDefault()
    
        fetch(baseURL + '/users', {
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
               size: '',  
            })
           
        }).catch(error => console.error({ 'Error': error }))
        
    }

    handleColorSubmit(event) {
        event.preventDefault()
    
        fetch(baseURL + '/colors', {
            method: 'POST',
            body: JSON.stringify({
                colorname: this.state.colorname,
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

            <div className = 'colorform'>
            <form className = 'newColor' onSubmit={this.handleColorSubmit}>
            
                <input type="text" id="colorname" name="colorname" onChange={this.handleColorChange} value={this.state.colorname}  />
                <input type="submit" value="Add a Color" />
            </form>
            </div>
            </div>
         
        )
    }
}

export default NewForm
