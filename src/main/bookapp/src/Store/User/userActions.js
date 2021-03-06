import {ADD_USER_REQUEST, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS} from "./userTypes";
import axios from "axios";

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUserRequest());
        axios.get("http://localhost:8080/users")
            .then(response => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message));
            });
    };
};

export const addUser = (name, lastName, email, password) => {
    const credentials = {
        name: name,
        lastName: lastName,
        email: email,
        password: password
    };
    return dispatch => {
        dispatch(addUserRequest());
        axios.post("http://localhost:8080/registration", credentials)
            .catch(error => {
                dispatch(fetchUserFailure());
            });
    }
}



const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    };
};

const addUserRequest = () => {
    return {
        type: ADD_USER_REQUEST
    };
};

const fetchUserSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    };
};

const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
};