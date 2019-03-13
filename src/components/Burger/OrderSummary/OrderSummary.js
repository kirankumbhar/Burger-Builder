import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(iKey => {
            return (<li key = {iKey}>
                    <span style = {{textTransform: 'capitalize'}}>{iKey}</span>: 
                    {props.ingredients[iKey]}
                </li>);
        });

    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout > </p>
            <Button btnType = "Danger" clicked = {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    );
};

export default orderSummary;