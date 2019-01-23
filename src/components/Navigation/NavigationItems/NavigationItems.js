import React from 'react';

import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><a href="/" className={props.active ? classes.active : null}>Burger Builder</a></li>
        <li><a href="/" className={props.active ? classes.active : null}>Checkout</a></li>
    </ul>
);

export default navigationItems;