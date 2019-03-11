import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
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
            <p>Continue to Checkout > </p>
        </Auxiliary>
    );
};

export default orderSummary;