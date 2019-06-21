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
            quantity: 1,
            printSideOneColors: 0,
            printSideTwoColors: 0,
            printSideOneColorsString: '',
            printSideTwoColorsString: '',
            shirtCost: 0,
            markup: 0,
            printSideOneCost: 0,
            printSideTwoCost: 0,
            netCost: 0,
            profit: 0, 
            totalCost: 0,
            totalProfit: 0,
            prices:[],
            loggedIn: false,

        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handlePrintSideOneColorsChange = this.handlePrintSideOneColorsChange.bind(this)
        this.handlePrintSideTwoColorsChange = this.handlePrintSideTwoColorsChange.bind(this)
        this.handleShirtCostChange = this.handleShirtCostChange.bind(this)
        this.handleMarkupChange = this.handleMarkupChange.bind(this)
        this.handlePriceSubmit = this.handlePriceSubmit.bind(this)

    }

    componentDidMount() {
        this.props.getPrices()
    }

    handleQuantityChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handlePrintSideOneColorsChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handlePrintSideTwoColorsChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleShirtCostChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleMarkupChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }


    handlePriceSubmit(event) {
        event.preventDefault()
        
        if(this.state.printSideOneColors == 1) {
            const copyPrice = this.props.prices[(this.state.quantity - 1)].one
            this.setState({printSideOneCost: copyPrice})
            console.log(copyPrice)
    
        }
        else if(this.state.printSideOneColors == 2) {
            const copyPrice = this.props.prices[(this.state.quantity - 1)].two
            this.setState({printSideOneCost: copyPrice})
            console.log(copyPrice)
        }
        else if(this.state.printSideOneColors == 3) {
            const copyPrice = this.props.prices[(this.state.quantity - 1)].three
            this.setState({printSideOneCost: copyPrice})
            console.log(copyPrice)
        }
        else if(this.state.printSideOneColors == 4) {
            const copyPrice = this.props.prices[(this.state.quantity - 1)].four
            this.setState({printSideOneCost: copyPrice})
            console.log(copyPrice)
        }
        else if(this.state.printSideOneColors == 5) {
            const copyPrice = this.props.prices[(this.state.quantity - 1)].five
            this.setState({printSideOneCost: copyPrice})
            console.log(copyPrice)
        }
        else {
            console.log('incorrect input');
        }

    }

    
    
    
    render() {
        return (
            <div className = "valign-wrapper">

            <form className = 'newPrice' onSubmit={this.handlePriceSubmit}>


            <div className = 'newPriceItem'>
                 <label htmlFor="quantity"><span className = "newPriceText">Quantity(whole number): </span></label>
                <input type="number" id="quantity" name="quantity" onChange={this.handleQuantityChange} value={this.state.quantity}  /> 
                </div>
           
                
                <div className = 'newPriceItem'>
                <label htmlFor="printSideOneColors"><span className = "newPriceText">PrintSideOneColors(whole number): </span></label>
                <input type="number" id="printSideOneColors" name="printSideOneColors" onChange={this.handlePrintSideOneColorsChange} value={this.state.printSideOneColors}  />    
                </div>  

                <div className = 'newPriceItem'>
                <label htmlFor="printSideTwoColors"><span className = "newPriceText">PrintSideTwoColors(whole number): </span></label>
                <input type="number" id="printSideTwoColors" name="printSideTwoColors" onChange={this.handlePrintSideTwoColorsChange} value={this.state.printSideTwoColors}  />  
                </div>    

                <div className = 'newPriceItem'>
                <label htmlFor="shirtCost"><span className = "newPriceText">ShirtCost (decimal): </span></label>
                <input type="number" id="shirtCost" name="shirtCost" onChange={this.handleShirtCostChange} value={this.state.shirtCost}  />     
                </div>

                <div className = 'newPriceItem'>
                <label htmlFor="markup"><span className = "newPriceText">Markup (decimal): </span></label>
                <input type="number" id="markup" name="markup" onChange={this.handleMarkupChange} value={this.state.markup}  />     
                </div>                    

                <input type="submit" value="Get Price P/L" id = 'priceInput'/>
                
            </form>

           
            </div>
         
        )
    }
}

export default PricingFormula
