import React from 'react';

import classes from './DrawerToggle.module.css';
// import Logo from '../../../Logo/Logo';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.onClick}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;