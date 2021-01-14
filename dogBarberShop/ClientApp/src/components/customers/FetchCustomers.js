import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import '../layout/styles.css';

import { fetchAllDistinctCustomers } from '../../actions';
import Loader from '../layout/Loader';
import CustomersList from './CustomersList';

function FetchCustomers() {
    const [loading, setLoading] = useState(true);
    const customer = useSelector(state => {
        console.log(state.customer);
        return state.customer;
    });
    const dispatch = useDispatch();
    const { customers } = customer;
    console.log(customers);
    console.log(customer);

    useEffect(() => {
        async function loadingFetchCustomersFromBackend() {
            const response = await dispatch(fetchAllDistinctCustomers());
            console.log(response);
            if (response.status === 200) {
            setLoading(false);
            }
        }
        loadingFetchCustomersFromBackend();
    }, [dispatch]);

    return (
        <div>
            {loading ?
                <div>
                    <img
                        src="favicon.ico"
                        id="loading-image"
                        loading="lazy"
                        alt=""
                    />
                    <Loader />
                </div>
                :
                <div>
                    <h4 style={{ textAlign: 'center' }}>
                        <b>Build</b> a Dog-barber-shop system
            </h4>
                    <br />
                    <img
                        src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        alt=""
                        style={{
                            float: 'right',
                            display: 'inline-block',
                            width: '350px',
                            height: '350px'
                        }}
                    />

                    {customers.length === 0
                        ?
                        <div>
                            <br />
                            <br />
                            <br />
                            <h1 style={{ textAlign: 'center' }}>
                                There is no orders of Any customer.
                        </h1>
                            <p style={{ textAlign: 'center' }}>
                                Are you wanna make an order?
                                please

                        <Link to="/register" className="item"> Register </Link>
                        or
                        <Link to="/login" className="item"> Login </Link>
                            </p>
                        </div>
                        :
                        <div>
                            <h1>Our Customers: </h1>
                            <br />
                            <table className="ui very basic single line collapsing celled table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Firstname</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer, index) => (
                                        <CustomersList customer={customer} key={index} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default FetchCustomers;