import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    SET_CURRENT_CUSTOMER,
    CUSTOMER_LOADING,
    GET_ERRORS,
    GET_ALL_ORDERS_OF_CUSTOMER_ID,
    ORDER_LOADING,
    FETCH_ORDER_BY_ID,
    FETCH_ALL_DISTINCT_CUSTOMERS,
    UPDATE_ORDER,
    DELETE_ORDER,
    CREATE_ORDER,
    ERROR_ORDER,
    REGISTER_CUSTOMER,
} from './types';

const URL_SERVER = `https://localhost:44391`;

export const fetchAllDistinctCustomers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_SERVER}/orders/getAllDistinctCustomers`);
            console.log(response);
            dispatch({
                type: FETCH_ALL_DISTINCT_CUSTOMERS,
                payload: response.data
            });
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
};

export const registerCustomer = (customer, history) => dispatch => {
    axios.post(`${URL_SERVER}/customers/register`, customer)
        .then(res => {
            history.push("/login");
            dispatch({
                type: REGISTER_CUSTOMER
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginCustomer = customer => dispatch => {
    axios
        .post(`${URL_SERVER}/customers/login`, customer, { withCredentials: true })
        .then(response => {
            console.log(response);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuthToken(token);
            // Set token to Auth header
            const decoded = jwt_decode(token);
            // Set current user

            dispatch(setCurrentCustomer(decoded));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

// Set logged in user
export const setCurrentCustomer = decoded => {
    return {
        type: SET_CURRENT_CUSTOMER,
        payload: decoded
    };
};

// Customer loading
export const setCustomerLoading = () => {
    return {
        type: CUSTOMER_LOADING
    };
};

// Log user out
export const logoutCustomer = () => dispatch => {
    const token = localStorage.token;
    console.log(token);
    setAuthToken(token);
    axios.get(`${URL_SERVER}/customers/logout`)
        .then(res => {
            console.log(res);
            // Remove token from local storage
            localStorage.removeItem("token");
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to empty object {} which will set isAuthenticated to false
            dispatch(setCurrentCustomer({}));
        })
        .catch(err => {
            console.log(err);
        });
};

// Orders loading
export const setOrderLoading = () => {
    return {
        type: ORDER_LOADING
    };
};

export const getAllOrdersOfCustomerId = (customerId) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_SERVER}/orders/getOrdersByCustomerId/${customerId}`);
            console.log(response);
            if (response.status === 200)
            {
                dispatch({
                    type: GET_ALL_ORDERS_OF_CUSTOMER_ID,
                    payload: response.data
                });
            }
            return response;
        } catch (err) {
            console.log(err);
        }

    }
};

export const fetchOrderById = orderId => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL_SERVER}/orders/getByOrderId/${orderId}`);
            console.log(response);
            dispatch({
                type: FETCH_ORDER_BY_ID,
                payload: response.data
            });
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
};

export const createOrder = (order, customerId) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL_SERVER}/orders/create/${customerId}`, order);
            console.log(response);
            dispatch({
                type: CREATE_ORDER,
                payload: response.data
            });
            return response;
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ERROR_ORDER,
                payload: err.response.data
            });
            return err.response.data;
        }
    }
};

export const updateOrder = (order, orderId) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`${URL_SERVER}/orders/updateOrder/${orderId}`, order);
            console.log(response);
            dispatch({
                type: UPDATE_ORDER,
                payload: response.data
            });
            return response;
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ERROR_ORDER,
                payload: err.response.data
            });
            return err.response.data;
        }
    }
};

export const deleteOrder = orderId => dispatch => {
    axios.delete(`${URL_SERVER}/orders/delete/${orderId}`)
        .then(response => {
            console.log(response);
            dispatch({
                type: DELETE_ORDER,
                payload: orderId
            });
        })
        .catch(err => {
            console.log(err);
        })
}