import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Ox/Ox';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}      //this is the clean way of toggling based on previous state, due to the asynchronous nature of setState
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    sideDrawerHandler={this.sideDrawerHandler} />
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    cancel={this.sideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);