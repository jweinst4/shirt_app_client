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
        printSideTwoQuantity: '',
        shirtCost: '',
        markUp: '',
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

    this.props.handlePriceSubmitApp(this.state.quantity,this.state.printSideOneQuantity,this.state.printSideTwoQuantity)
    
    }

    render() {
        return (
            <div className = "valign-wrapper">
            
            <div className = "row pricingFigures">
            <div class = 'col'>
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
            <label htmlFor="printSideTwoQuantity"><span className = "newPriceNumber">PrintSideTwoQuantity: </span></label>
                <input type="number" id="printSideTwoQuantity" name="printSideTwoQuantity" onChange={this.handlePriceChange} value={this.state.printSideTwoQuantity}  />  
                </div>


                <div className = 'newPriceItem'>
            <label htmlFor="shirtCost"><span className = "newPriceText">ShirtCost(MUST BE 150 for $1.50): </span></label>
                <input type="number" id="shirtCost" name="shirtCost" step=".01" onChange={this.handlePriceChange} value={this.state.shirtCost}  />  
                </div> 

                <div className = 'newPriceItem'>
            <label htmlFor="markUp"><span className = "markUp">MarkUp(MUST BE 50 for 50%): </span></label>
                <input type="number" id="markUp" name="markUp" onChange={this.handlePriceChange} value={this.state.markUp}  />  
                </div>  

                <div className = 'newPriceItem'>
           
               
                </div>
             
                <input type="submit" value="Get a Price Quote" id = 'priceInput' />
           
            </form>
            </div>  
 


<div className = "col printFiguresLeft">
            <h6>pricingQuantity: {this.state.quantity}</h6>
            <h6>pricingPrintSideOneColors: {this.state.printSideOneQuantity}</h6>
            <h6>pricingPrintSideTwoColors: {this.state.printSideTwoQuantity}</h6>
            <h6>pricingPrintSideOneCost: ${this.props.printSideOneCostApp}</h6>
            <h6>pricingPrintSideTwoCost: ${this.props.printSideTwoCostApp}</h6>

            </div>
            <div className = "col printFiguresRight">
            <h6>pricingShirtCost: ${this.state.shirtCost / 100}</h6>
            <h6>pricingNetCost: ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100))}</h6>
            <h6>pricingMarkUp: {this.state.markUp}%</h6>
        
            
            <h6>pricingProfit: ${((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            <h6>pricingTotalCost: ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) + ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            <h6>pricingTotalProfit: ${this.state.quantity * ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            </div>
            </div>
     
            </div>
         
        )
    }
}

export default PricingFormula
