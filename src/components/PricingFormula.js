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
        lightShirt: '',
        darkShirt: '',
        embroidery: '',

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
    <div className = 'row s12 m12 l12 '>

<div className = 'row s12 m12 l12'>
<div className = 'lightShirt col s4 m4 l4' onClick={() => { 
      this.props.lightShirtPricing() }} style={{backgroundColor: this.props.lightShirtBackgroundColor}}><h6>LightShirt</h6></div>
      <div className = 'darkShirt col s4 m4 l4' onClick={() => { 
      this.props.darkShirtPricing() }} style={{backgroundColor: this.props.darkShirtBackgroundColor}}><h6>DarkShirt</h6></div>
      <div className = 'embroidery col s4 m4 l4' onClick={() => { 
      this.props.embroideryPricing() }} style={{backgroundColor: this.props.embroideryBackgroundColor}}><h6>Embroidery (not done yet)</h6></div>


</div>
            <form className = 'col s6 m6 l6 ' onSubmit={this.handlePriceSubmit}>
          
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s10 m10 l10' htmlFor="quantity">Quantity:</label>
             <input className = 'col s2 m2 l2' type="number" id="quantity" name="quantity" onChange={this.handlePriceChange} value={this.state.quantity}  />  
             </div>   
 


         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s10 m10 l10' htmlFor="printSideOneQuantity">PrintSideOneQuantity:</label>
             <input className = 'col s2 m2 l2' type="number" id="printSideOneQuantity" name="printSideOneQuantity" onChange={this.handlePriceChange} value={this.state.printSideOneQuantity}  />  
             </div>   


  
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s10 m10 l10' htmlFor="printSideTwoQuantity">PrintSideTwoQuantity:</label>
             <input className = 'col s2 m2 l2' type="number" id="printSideTwoQuantity" name="printSideTwoQuantity" onChange={this.handlePriceChange} value={this.state.printSideTwoQuantity}  />  
             </div>   



         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s10 m10 l10' htmlFor="shirtCost">shirtCost(MUST BE 150 for $1.50, 200 for $2.00, etc.):</label>
             <input className = 'col s2 m2 l2' type="number" id="shirtCost" name="shirtCost" onChange={this.handlePriceChange} value={this.state.shirtCost}  />  
             </div>   
       


 
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s9 m9 l9' htmlFor="markUp">markUp(MUST BE 50 for 50%, 100 for 100%, etc.):</label>
             <input className = 'col s3 m3 l3' type="number" id="markUp" name="markUp" onChange={this.handlePriceChange} value={this.state.markUp}  />  
             </div>   
           


      
         <div className = 'col s12 m12 l12 form-group'>
             <input type="submit" value="Get Price Quote"/>
             </div>
    
          
         </form>










<div className = "priceOutput col s6 m6 l6">
<div className = 'col s12 m12 l12'>


            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>{this.props.currentPricingType}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>Quantity:</h6><h6 className = 'col s2 m2 l2'> {this.state.quantity}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>PrintSideOneColors: </h6><h6 className = 'col s2 m2 l2'> {this.state.printSideOneQuantity}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>PrintSideTwoColors: </h6> <h6 className = 'col s2 m2 l2'> {this.state.printSideTwoQuantity}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>PrintSideOneCost:  </h6><h6 className = 'col s2 m2 l2'> ${this.props.printSideOneCostApp}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>PrintSideTwoCost:  </h6><h6 className = 'col s2 m2 l2'> ${this.props.printSideTwoCostApp}</h6>
            </div>

     
            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>ShirtCost:  </h6><h6 className = 'col s2 m2 l2'> ${this.state.shirtCost / 100}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>NetCost:  </h6><h6 className = 'col s2 m2 l2'> ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100))}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>MarkUp:  </h6><h6 className = 'col s2 m2 l2'> {this.state.markUp}%</h6>
            </div>
        
            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>Profit:  </h6><h6 className = 'col s2 m2 l2'> ${((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>TotalCost:  </h6><h6 className = 'col s2 m2 l2'> ${(this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) + ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            </div>

            <div className = 'row s12 m12 l12'>
            <h6 className = 'col s10 m10 l10'>TotalProfit:  </h6><h6 className = 'col s2 m2 l2'> ${this.state.quantity * ((this.props.printSideOneCostApp + this.props.printSideTwoCostApp + (this.state.shirtCost / 100)) * (this.state.markUp / 100))}</h6>
            </div>
            </div>

            </div>
     
        
    
            </div>
        )
    }
}

export default PricingFormula
