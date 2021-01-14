import {
    SET_CURRENT_CUSTOMER,
    CUSTOMER_LOADING,
    GET_ERRORS,
    FETCH_CUSTOMERS,
    REGISTER_CUSTOMER
} from "../actions/types";
import isEmpty from 'is-empty';

const DEFAULT_STATE = {
    isAuthenticated: false,
    customer: {},
    loading: false,
    errors: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case REGISTER_CUSTOMER:
            return {
                ...state,
                loading: false,
                errors: {}
            }
        case SET_CURRENT_CUSTOMER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                customer: action.payload,
                errors: {}
            }
        case CUSTOMER_LOADING:
            return {
                ...state,
                loading: true
            };
        case FETCH_CUSTOMERS:
            return {
                ...state,
                errors: {}
            }
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;
    }
}