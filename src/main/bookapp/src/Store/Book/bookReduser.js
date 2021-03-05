import {
    BOOK_FAILURE,
    BOOK_SUCCESS,
    DELETE_BOOK_REQUEST,
    FETCH_BOOK_REQUEST, FETCH_GENRES_REQUEST,
    FETCH_LANGUAGES_REQUEST, GENRES_FAILURE, GENRES_SUCCESS, LANGUAGES_FAILURE, LANGUAGES_SUCCESS,
    SAVE_BOOK_REQUEST,
    UPDATE_BOOK_REQUEST
} from "./bookTypes";

const initialState = {
    book: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_BOOK_REQUEST:
        case FETCH_BOOK_REQUEST:
        case UPDATE_BOOK_REQUEST:
        case DELETE_BOOK_REQUEST:
        case FETCH_LANGUAGES_REQUEST:
        case FETCH_GENRES_REQUEST:
            return {
                ...state
            };
        case BOOK_SUCCESS:
            return {
                book: action.payload,
                error: ''
            };
        case BOOK_FAILURE:
            return {
                book: '',
                error: action.payload
            };
        case LANGUAGES_SUCCESS:
            return {
                languages: action.payload,
                error: ''
            };
        case LANGUAGES_FAILURE:
            return {
                languages: '',
                error: action.payload
            };
        case GENRES_SUCCESS:
            return {
                genres: action.payload,
                error: ''
            };
        case GENRES_FAILURE:
            return {
                genres: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;