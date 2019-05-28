import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><NavLink exact to='/' activeClassName={classes.active}>Burger Builder</NavLink></li>
        <li><NavLink to='/orders' activeClassName={classes.active}>Orders</NavLink></li>
        <li><NavLink to='/auth' activeClassName={classes.active}>Authenticate</NavLink></li>
    </ul>
);

export default navigationItems;