import React, { Component } from 'react';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}



class PricingFormula extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        quantity: '',
        printSideOneQuantity: '',
        shirtCost: '',
        markUp: '',
        printSideOneCost: '',
        numberColorsText: ''
        }
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handlePriceSubmit = this.handlePriceSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getPrices()
    }

    handlePriceChange(event) {
        this.setState({ [event.currentTarget.id]: parseInt(event.currentTarget.value )})
        
    }

    handlePriceSubmit(event) {
    event.preventDefault();
    this.props.getPrices();

        

        if(this.state.printSideOneQuantity === 1) {
            this.setState({printSideOneCost: parseFloat(this.props.prices[this.state.quantity-1].one)})
            
            
        }
        else if (this.state.printSideOneQuantity === 2) {
            this.setState({printSideOneCost: parseFloat(this.props.prices[this.state.quantity-1].two)})
        }
        else if (this.state.printSideOneQuantity === 3) {
            this.setState({printSideOneCost: parseFloat(this.props.prices[this.state.quantity-1].three)})
        } 
        else if (this.state.printSideOneQuantity === 4) {
            this.setState({printSideOneCost: parseFloat(this.props.prices[this.state.quantity-1].four)})
        } 
        else if (this.state.printSideOneQuantity === 5) {
            this.setState({printSideOneCost: parseFloat(this.props.prices[this.state.quantity-1].five)})
        }
               
        
       
        
    }

    render() {
        return (
            <div className = "valign-wrapper">
            
            <form className = 'newPrice' onSubmit={this.handlePriceSubmit}>

            <div className = 'newPriceItem'>
            <label htmlFor="quantity"><span className = "newPriceText">Quantity: </span></label>
                <input type="number" id="quantity" name="quantity" onChange={this.handlePriceChange} value={this.state.quantity}  />  
                </div> 

                <div className = 'newPriceItem'>
            <label htmlFor="printSideOneQuantity"><span className = "newPriceNumber">PrintSideOneQuantity: </span></label>
                <input type="number" id="printSideOneQuantity" name="printSideOneQuantity" onChange={this.handlePriceChange} value={this.state.printSideOneQuantity}  />  
                </div>   

                <div className = 'newPriceItem'>
            <label htmlFor="shirtCost"><span className = "newPriceText">ShirtCost: </span></label>
                <input type="number" id="shirtCost" name="shirtCost" onChange={this.handlePriceChange} value={this.state.shirtCost}  />  
                </div> 

                <div className = 'newPriceItem'>
            <label htmlFor="markUp"><span className = "markUp">MarkUp: </span></label>
                <input type="number" id="markUp" name="markUp" onChange={this.handlePriceChange} value={this.state.markUp}  />  
                </div>  

                <div className = 'newPriceItem'>
           
               
                </div>
             
                <input type="submit" value="Get a Price Quote" id = 'priceInput' />
           
            </form>
 

           <h3>PrintSideOneCost:{this.state.printSideOneCost}</h3>
            </div>
         
        )
    }
}

export default PricingFormula
