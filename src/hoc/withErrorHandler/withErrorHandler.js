import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Ox/Ox';
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error:null
        }
        componentWillMount () {
            axios.interceptors.request.use(req => {             //used to set error state to null if there are no errors
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {     //record error if there is one
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        cancel={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <Backdrop show={this.state.error} cancel={this.errorConfirmedHandler}/>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
