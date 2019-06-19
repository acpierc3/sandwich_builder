import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as authActions from '../../store/actions/index';
import axios from '../../axios-orders';
import { checkValidity } from '../../shared/utility';

const Auth = props => {

    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Email"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        })

        const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/');
        }
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            }
        }

        //WILL IMPLEMENT LATER
        
        // let formIsValid = true;
        // for (let controlName in updatedControls) {
        //     formIsValid = updatedControls[controlName].valid && formIsValid;
        // }

        // this.setState({controls: updatedControls, formIsValid: formIsValid});
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
        />
        
    ))

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to ={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                <h3>{isSignup ? "New User Registration" : "User Log-in"}</h3>
                {form}
                {errorMessage}
                <Button type="Success">SUBMIT</Button>
                <p>{isSignup ? "Already have an account?" : "Don't have an account?"}</p>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                type="Danger">{isSignup ? "SWITCH TO LOGIN" : "REGISTER NOW"}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (authRedirectPath) => dispatch(authActions.setAuthRedirectPath(authRedirectPath))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));