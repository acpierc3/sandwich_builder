import React from 'react';

import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css';

const controls = [
    {label:"Lettuce", type:"lettuce"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"},
];

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                type={ctrl.type} 
                onAddIngred={props.onAddIngred} 
                onRemoveIngred={props.onRemoveIngred}
                disabledInfo={props.disabledInfo[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.onPurchase}>ORDER THIS BURG</button>
    </div>

);

export default buildControls;