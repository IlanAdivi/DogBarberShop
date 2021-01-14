import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Landing from './layout/menu/Landing';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './privateRoute/PrivateRoute';
import {
    setCurrentCustomer,
    logoutCustomer
} from '../actions/index';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import SelectedOrder from './orders/SelectedOrder';
import UpdateOrder from './orders/UpdateOrder';
import CreateOrder from './orders/CreateOrder';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const authenticated = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    // Check for token to keep user logged in
    if (localStorage.token && !authenticated.isAuthenticated) {

        // Set auth token header auth
        const token = localStorage.token;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        dispatch(setCurrentCustomer(decoded));
        history.push("/dashboard");
        // Check for expired token
        const currentTime = Date.now() / 100000000; // to get in milliseconds
        console.log(currentTime);
        if (decoded.exp < currentTime) {
            // Logout user

            dispatch(logoutCustomer());

            // Redirect to login
            history.push("/login");
        }
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/order/create" component={CreateOrder} />
                <PrivateRoute exact path="/order/:id" component={SelectedOrder} />
                <PrivateRoute exact path="/order/update/:id" component={UpdateOrder} />
            </Switch>
        </div>
    );
}

export default App;