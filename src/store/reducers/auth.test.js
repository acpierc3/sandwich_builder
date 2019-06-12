import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// import React from 'react';

// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({adapter: new Adapter()});

describe('auth reducer', () => {

    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should save error upon login error', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_FAIL,
            error: 'some-error'
        })).toEqual({
            ...initialState,
            error: 'some-error',
            loading: false
        })
    })

    it('should remove user and token upon logout', () => {
        expect(reducer({
            ...initialState,
            userId: 'test-id',
            token: 'test-token'
        }, {
            type: actionTypes.AUTH_LOGOUT
        })).toEqual({
            ...initialState,
            token: null,
            userId: null
        })
    })
})