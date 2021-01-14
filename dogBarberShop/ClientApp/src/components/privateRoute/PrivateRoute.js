import React from 'react';
import {
    useSelector
} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, auth, ...rest }) {
    console.log(auth);
    console.log(rest);
    const authenticated = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    console.log(Component);

    return (
        <Route
            {...rest}
            render={props =>
                authenticated.isAuthenticated === true ?
                    (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
}

export default PrivateRoute;