import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutCustomer } from '../../../actions';

function LogoutMenu() {
    const dispatch = useDispatch();
    const onLogoutClick = e => {
        e.preventDefault();
        dispatch(logoutCustomer());
    };

    return (
        <div
            className="ui menu"
            id="sticky-nav"
        >
            <div className="left menu">
                <Link
                    to="/dashboard"
                    className="item"
                >
                    <i className="home icon"></i>
                    Home
                    </Link>
            </div>
            <div className="right menu">
                <Link
                    to="/"
                    className="item"
                    onClick={onLogoutClick}
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default LogoutMenu;