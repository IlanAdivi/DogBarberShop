import {
    CREATE_ORDER,
    DELETE_ORDER,
    ERROR_ORDER,
    FETCH_ORDER_BY_ID,
    GET_ALL_ORDERS_OF_CUSTOMER_ID,
    ORDER_LOADING,
    UPDATE_ORDER
} from '../actions/types'

const DEFAULT_STATE = {
    orders: [],
    loading: false,
    errors: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS_OF_CUSTOMER_ID:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case CREATE_ORDER:
            return {
                orders: [...state.orders, action.payload],
                loading: false
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ?
                        action.payload
                        :
                        order
                ),
                loading: false
            }
        case FETCH_ORDER_BY_ID:
            return {
                orders: action.payload,
                loading: false
            }
        case DELETE_ORDER:
            return {
                orders: state.orders.filter(order =>
                    order.id !== action.payload ?
                        order
                        :
                        null
                ),
                loading: false
            }
        case ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR_ORDER:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}