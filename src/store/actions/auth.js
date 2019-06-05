import axios from 'axios';

import * as actionTypes from './actionTypes';

const KEY = process.env.REACT_APP_KEY;

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//action creators allow for async actions 
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +KEY;
        if (!isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +KEY;
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (authRedirectPath) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath: authRedirectPath
    }
}