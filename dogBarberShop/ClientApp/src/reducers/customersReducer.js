import { FETCH_ALL_DISTINCT_CUSTOMERS } from "../actions/types";

const DEFAULT_STATE = {
    customers: [],
    loading: false,
    errors: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_DISTINCT_CUSTOMERS:
            return {
                customers: action.payload,
                loading: false
            }
        default:
            return state;
    }
}