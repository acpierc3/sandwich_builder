import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Ox/Ox';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerHandler = () => {
        // this.setState( ( prevState ) => {
        //     return {showSideDrawer: !prevState.showSideDrawer}      //this is the clean way of toggling based on previous state, due to the asynchronous nature of setState
        // })

        //using hooks:
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar 
                isAuthenticated={props.isAuthenticated}
                sideDrawerHandler={sideDrawerHandler} />
            <SideDrawer 
                isAuthenticated={props.isAuthenticated}
                show={showSideDrawer} 
                cancel={sideDrawerHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);