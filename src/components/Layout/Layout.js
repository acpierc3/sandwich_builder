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
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }

    render () {
        return (
            <Aux>
                <Toolbar />
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