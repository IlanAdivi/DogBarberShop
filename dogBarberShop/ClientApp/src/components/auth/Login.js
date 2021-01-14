import React, {
    useEffect,
    useState
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import '../layout/styles.css';
import { loginCustomer } from '../../actions/index';
import { existEmptyPropertyAuth } from '../../utils/emptyItem';

function Login() {
    const [customer, setCustomer] = useState({
        username: '',
        password: '',
    });

    const auth = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }

    }, [auth, history]);

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

    const onSubmit = event => {
        event.preventDefault();
        dispatch(loginCustomer(customer));
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
            </div>

            <div className="ui container">
                <h4 className="ui dividing header">Login</h4>

                <form
                    noValidate
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div
                        className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            placeholder="Please type your username"
                            value={customer.username}
                            onChange={onChangeUsername}
                            id={auth.errors.message || auth.errors.errors?.Username || auth.errors.errors?.username ? "error-border-color" : ""}
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

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={onChangePassword}
                            value={customer.password}
                            autoComplete="new-password"
                            placeholder="Please type your password"
                            id={auth.errors.message || auth.errors.errors?.Password || auth.errors.errors?.password ? "error-border-color" : "password"}
                            type="password"
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
                    <p className="grey-text text-darken-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>

                    <button
                        className="ui button"
                        type="submit"
                        disabled={existEmptyPropertyAuth(customer) ? true : false}
                        onClick={onSubmit}
                    >Submit</button>
                </form>
                <div
                    style={{ color: 'red' }}
                >{auth.errors.message ? auth.errors.message : null}
                </div>
            </div>
        </div>
    );
}

export default Login;