import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
    <div>
        {props.show ? <div className={classes.Backdrop} onClick={props.cancel}></div> : null}
    </div>
);

export default backdrop;