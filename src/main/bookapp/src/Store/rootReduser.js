import {combineReducers} from "redux";
import userReducer from "./User/userReducer";
import authReducer from './User/Auth/authReduser';
import bookReducer from './Book/bookReduser';


const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    auth: authReducer
});

export default rootReducer;