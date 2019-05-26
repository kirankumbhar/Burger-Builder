import React from 'react';

import classes from './Order.module.css';
const order = (props) => (
    <div className = {classes.Order}>
        <p>Ingredeints: Salad (1)</p>
        <p>Price: <strong>USD </strong></p>
    </div>
);

export default order;

