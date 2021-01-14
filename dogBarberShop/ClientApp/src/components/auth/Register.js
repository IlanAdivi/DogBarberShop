import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import '../layout/styles.css';
import { registerCustomer } from '../../actions';
import { existEmptyPropertyAuth } from '../../utils/emptyItem';

function Register() {

    const [customer, setCustomer] = useState({
        username: '',
        password: '',
        firstname: '',
    });
    const history = useHistory();
    const dispatch = useDispatch();

    const auth = useSelector(state => {
        console.log(state.auth);
        return state.auth
    });

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }
        , [auth, history]);

    const onChangeUsername = event => {
        setCustomer({
            ...customer,
            username: event.target.value
        });
    };

    const onChangePassword = event => {
        setCustomer({
            ...customer,
            password: event.target.value
        });
    };

    const onChangeFirstname = event => {
        setCustomer({
            ...customer,
            firstname: event.target.value
        });
    };

    const onSubmit = async event => {
        event.preventDefault();
        dispatch(registerCustomer(customer, history));
    };

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
                <br />
            </div>
            <div className="ui container">
                <h4 className="ui dividing header">Register</h4>
                <br />
                <form className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            placeholder="Please type your Username"
                            onChange={onChangeUsername}
                            value={customer.username}
                            id={auth.errors.errors?.Username || auth.errors.errors?.username ? "error-border-color" : "username"}
                        />
                        <div
                            id="error-color"
                        >{auth.errors.errors ?
                            auth.errors.errors.Username
                            ||
                            auth.errors.errors.username :
                            null}
                        </div>
                    </div>

                    <div
                        className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="text"
                            autoComplete="new-password"
                            placeholder="Please type your Password"
                            onChange={onChangePassword}
                            value={customer.password}
                            id={auth.errors.errors?.Password || auth.errors.errors?.password ? "error-border-color" : "password"}
                        />
                        <div
                            id="error-color"
                        >{auth.errors.errors ?
                            auth.errors.errors.Password
                            ||
                            auth.errors.errors.password :
                            null}
                        </div>
                    </div>

                    <div
                        className="field">
                        <label>Firstname</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Please type your Firstname"
                            onChange={onChangeFirstname}
                            value={customer.firstname}
                            id={auth.errors.errors?.Firstname || auth.errors.errors?.firstname ? "error-border-color" : ""}
                        />
                        <div
                            id="error-color"
                        >{auth.errors.errors ?
                            auth.errors.errors.Firstname
                            ||
                            auth.errors.errors.firstname :
                            null}
                        </div>
                    </div>
                    <button
                        className="ui button"
                        type="submit"
                        disabled={existEmptyPropertyAuth(customer) ? true : false}
                        onClick={onSubmit}
                    >Submit</button>
                </form>
            </div>
        </div >
    );
}

export default Register;