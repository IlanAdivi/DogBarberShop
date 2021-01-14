import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import FetchCustomers from '../../customers/FetchCustomers';
import { useSelector } from 'react-redux';

function Landing() {
    console.log('Landing');

     const auth = useSelector(state => {
         console.log(state.auth);
         return state.auth;
     });

    console.log(auth);

    return (
        <div>
            <div
                className="ui menu"
                id="sticky-nav"
            >
                <Link to="/" className="item">
                    <i className="home icon"></i>
                Home
                </Link>
                <div className="right menu">
                    <Link to="/register" className="item">Register</Link>
                    <Link to="/login" className="item">Login</Link>
                </div>
            </div>
            <div className="ui container">
                {!auth.isAuthenticated ?
                    <FetchCustomers />
                    :
                    null
                }
            </div>
        </div>
    );
}

export default Landing;