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
            
<div className = "pricingContainer">
     
            <div className = 'row pricingFigures'>
            <div class = 'col'>
            <form className = 'newPrice' onSubmit={this.handlePriceSubmit}>

            <div className = 'newPriceItem'>
            <label htmlFor="quantity"><div className = "newPriceText">Quantity: </div></label>
                <input type="number" id="quantity" name="quantity" onChange={this.handlePriceChange} value={this.state.quantity}  />  
                </div> 

                <div className = 'newPriceItem'>
            <label htmlFor="printSideOneQuantity"><div className = "newPriceText">PrintSideOneColors: </div></label>
                <input type="number" id="printSideOneQuantity" name="printSideOneQuantity" onChange={this.handlePriceChange} value={this.state.printSideOneQuantity}  />  
                </div>

                <div className = 'newPriceItem'>
            <label htmlFor="printSideTwoQuantity"><div className = "newPriceText">PrintSideTwoColors: </div></label>
                <input type="number" id="printSideTwoQuantity" name="printSideTwoQuantity" onChange={this.handlePriceChange} value={this.state.printSideTwoQuantity}  />  
                </div>


                <div className = 'newPriceItem'>
            <label htmlFor="shirtCost"><div className = "newPriceText">ShirtCost(MUST BE 150 for $1.50): </div></label>
                <input type="number" id="shirtCost" name="shirtCost" step=".01" onChange={this.handlePriceChange} value={this.state.shirtCost}  />  
                </div> 

                <div className = 'newPriceItem'>
            <label htmlFor="markUp"><div className = "newPriceText">MarkUp(MUST BE 50 for 50%): </div></label>
                <input type="number" id="markUp" name="markUp" onChange={this.handlePriceChange} value={this.state.markUp}  />  
                </div>  

                <div className = 'newPriceItem'>
           
               
                
             
                <input type="submit" value="Get a Price Quote" id = 'priceInput' />
                </div>
            </form>
            </div>  
 

<div className = "printFigures">
<div className = "col printFiguresLeft">
            <h6>Quantity: {this.state.quantity}</h6>
            <h6>PrintSideOneColors: {this.state.printSideOneQuantity}</h6>
            <h6>PrintSideTwoColors: {this.state.printSideTwoQuantity}</h6>
            <h6>PrintSideOneCost: ${this.props.printSideOneCostApp}</h6>
            <h6>PrintSideTwoCost: ${this.props.printSideTwoCostApp}</h6>

     

            <h6>ShirtCost: ${this.state.shirtCost / 100}</h6>
            <h6>NetCost: ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100))}</h6>
            <h6>MarkUp: {this.state.markUp}%</h6>
        
            
            <h6>Profit: ${((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            <h6>TotalCost: ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) + ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            <h6>TotalProfit: ${this.state.quantity * ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            </div>
            </div>
     
            </div>
            </div>
            </div>
        )
    }
}

export default PricingFormula
