import axios from "axios";
import {FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS} from "./authTypes";


export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password
    };

    return dispatch => {
        dispatch({
           type: LOGIN_REQUEST
        });
        axios.post("http://localhost:8080/login", credentials)
            .then(response => {
                let token = response.data.token;
                localStorage.setItem('jwtToken', token);
                dispatch(success(true));
            })
            .catch(error => {
                dispatch(failure());
            });
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        localStorage.removeItem('jwtToken');
        dispatch(success(false));
    };
};

const success = isLoggedIn => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
};