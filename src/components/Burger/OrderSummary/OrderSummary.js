import React from 'react';

import Aux from '../../../hoc/Ox/Ox';
import Button from '../../UI/Button/Button';
// import classes from './OrderSummary.module.css'

const OrderSummary = props => {

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
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" clicked={props.clickCancel}>CANCEL</Button>
            <Button type="Success" clicked={props.clickContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary;