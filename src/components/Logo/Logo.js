import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'
                                                        //height: props.height is a way of dynamically setting sizing of a reusable element
const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;