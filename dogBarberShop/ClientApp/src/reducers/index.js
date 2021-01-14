import { combineReducers } from 'redux';
import customersReducer from './customersReducer';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

export const reducers = combineReducers({
    customer: customersReducer,
    auth: authReducer,
    order: ordersReducer
});