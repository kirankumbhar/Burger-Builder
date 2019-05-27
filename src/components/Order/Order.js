import React from 'react';

import classes from './Order.module.css';
const order = (props) => {
    const ingredients =  [];
    for (const ingrdeintName in props.ingredients) {
        if (props.ingredients.hasOwnProperty(ingrdeintName)) {
            const amount = props.ingredients[ingrdeintName];
            ingredients.push({
                name: ingrdeintName,
                amount: amount
            });
            
        }
    }

    const ingredientsOutput = ingredients.map (ig => {
        return <span style = {{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px'
        }}>{ig.name} {ig.amount}</span>
    });
    return (
        <div className = {classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    );
};

export default order;

