import React, { Component } from 'react';

import Aux from '../../../hoc/Ox';
import Button from '../../UI/Button/Button';
// import classes from './OrderSummary.module.css'

class OrderSummary extends Component {
    //this could easily be a functional component, should update
    componentWillUpdate() {
        console.log('[OrderSummary] Will Update');
    }

    render () {

        const ingredientSummary = Object.entries(this.props.ingredients).map(ingred => (
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
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button type="Danger" clicked={this.props.clickCancel}>CANCEL</Button>
                <Button type="Success" clicked={this.props.clickContinue}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;