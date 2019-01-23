import React, { Component } from 'react';

import Aux from '../../hoc/Ox';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}      //this is the clean way of toggling based on previous state, due to the asynchronous nature of setState
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar sideDrawerHandler={this.sideDrawerHandler} />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    cancel={this.sideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;