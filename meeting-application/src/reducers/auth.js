import {
    LOGIN,
    LOGOUT
} from '../actions/constants';
const initialState = {
    token: localStorage.getItem( 'TOKEN' ) || '',
    email: localStorage.getItem( 'EMAIL' ) || ''
};
const authReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email
            };
        case LOGOUT:
            return {
                token: '',
                email: ''
            };
        default:
            return state;
    }
};
export default authReducer;