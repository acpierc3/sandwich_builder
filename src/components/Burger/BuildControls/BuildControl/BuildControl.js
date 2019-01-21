import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = ( props ) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less} 
            onClick={(e) => props.onRemoveIngred(props.type,e)}
            disabled={props.disabledInfo}>Less</button>
        <button 
            className={classes.More} 
            onClick={(e) => props.onAddIngred(props.type,e)}>More</button>
    </div>

);

export default buildControl;