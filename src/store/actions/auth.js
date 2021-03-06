import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime*1000)
    };
}

export const auth = (email, password, isSignUP) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCfrgdcwfrL76BJQTllkSaVZ7rMxukjAQ';
        if (!isSignUP) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCfrgdcwfrL76BJQTllkSaVZ7rMxukjAQ';
        }
        console.log(url);
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    }
}