import React,{ Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('Ordersummary will update');
        
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
                .map(iKey => {
                    return (<li key = {iKey}>
                            <span style = {{textTransform: 'capitalize'}}>{iKey}</span>: 
                            {this.props.ingredients[iKey]}
                        </li>);
                });
        return (
            <Auxiliary>
            <h3>Your Order</h3>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout > </p>
            <Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
        );
    }
}

export default OrderSummary;