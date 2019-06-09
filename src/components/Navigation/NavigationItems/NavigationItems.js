import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><NavLink exact to='/' activeClassName={classes.active}>Burger Builder</NavLink></li>
        {props.isAuthenticated 
            ? <li><NavLink to='/orders' activeClassName={classes.active}>Orders</NavLink></li> 
            : null}
        {!props.isAuthenticated 
            ? <li><NavLink to='/auth' activeClassName={classes.active}>Login</NavLink></li>
            : <li><NavLink to='/logout' activeClassName={classes.active}>Logout</NavLink></li>}
    </ul>
);

export default navigationItems;