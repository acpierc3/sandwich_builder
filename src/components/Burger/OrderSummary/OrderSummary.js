import React from 'react';

import Aux from '../../../hoc/Ox';
// import classes from './OrderSummary.module.css'

const orderSummary = (props) => {
    const ingredientSummary = Object.entries(props.ingredients).map(ingred => (
        <li key={ingred[0]}>
            <span style={{textTransform: 'capitalize'}}>{ingred[0]}</span>: {ingred[1]}
        </li>
    ));

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>An okay burger with these ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            
        </Aux>
    )
};

export default orderSummary;