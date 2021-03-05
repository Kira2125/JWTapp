import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReduser";
import authToken from "./AuthUtil/authToken";
import thunk from "redux-thunk";


const store = createStore(rootReducer, applyMiddleware(thunk));

if(localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
}

export default store;