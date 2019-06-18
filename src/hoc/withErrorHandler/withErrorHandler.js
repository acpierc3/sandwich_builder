import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Ox/Ox';
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal 
                    show={error}
                    cancel={clearError}>
                    {error? error.message : null}
                </Modal>
                <Backdrop show={error} cancel={clearError}/>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;
