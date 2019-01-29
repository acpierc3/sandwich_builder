import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it taste good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                type="Danger"
                clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button
                type="Success"
                clicked={props.onCheckoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;