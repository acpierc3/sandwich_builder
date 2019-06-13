import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Ox/Ox';
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        // since we are changing to a functional component, can remove componentwillmount because this code will run before JSX code is rendered
        // componentWillMount () {
            const reqInterceptor = axios.interceptors.request.use(req => {             //used to set error state to null if there are no errors
                setError(null);
                return req;
            });
            const resInterceptor = axios.interceptors.response.use(res => res, err => {     //record error if there is one
                setError(err);
            });
        // }

        //removes interceptors when component is no longer mounted so that a bunch of interceptors dont exist after mounting/unmounting multiple components
        useEffect(() => {
            
            //return in useEffect() hook is the "cleanup" function
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor])            
            

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal 
                    show={error}
                    cancel={errorConfirmedHandler}>
                    {error? error.message : null}
                </Modal>
                <Backdrop show={error} cancel={errorConfirmedHandler}/>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;
