import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../layout/styles.css';

import {
    getAllOrdersOfCustomerId
} from '../../actions/index';
import Loader from '../layout/Loader';
import FetchOrder from '../orders/FetchOrder';
import LogoutMenu from '../layout/menu/LogoutMenu';
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    const order = useSelector(state => {
        console.log(state.order);
        return state.order;
    });

    console.log(order);

    useEffect(() => {
        async function loadingAllOrdersOfCustomerIdFromBackend() {
            const customerId = auth.customer.unique_name;
            const response = await dispatch(getAllOrdersOfCustomerId(customerId));
            console.log(response);
             if (response.status === 200) {
            setLoading(false);
             }
        }
        loadingAllOrdersOfCustomerIdFromBackend();
    }
        , [dispatch, auth.customer.unique_name]);

    const { customer } = auth;

    console.log(customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);

    return (
        <div>
            {
                !order ||
                    loading ?
                    <div>
                        <img
                            src={require("../layout/images/favicon.ico")}
                            id="loading-image"
                            loading="eager"
                            alt=""
                        />
                        <Loader />
                    </div>
                    :
                    <div>
                        <LogoutMenu />

                        <div className="ui container">
                            <h4>
                                <b>Welcome,</b> {customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}
                                <br />
                                <br />
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into a Dog-barber-shop system{" "}
                                </p>
                            </h4>
                            <br />
                            <br />
                            <br />
                            <br />

                            {order.orders.length === 0 ?
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>
                                        There is no orders of {customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}
                                    </h4>
                                    <p
                                        style={{ textAlign: 'center' }}
                                        className="flow-text grey-text text-darken-1"
                                    >Are you wanna make an order?
                                        <a
                                            href="!#"
                                            style={{ margin: '5px' }}
                                            onClick={e => {
                                                e.preventDefault();
                                                history.push(`/order/create`);
                                            }}
                                        >
                                            Create order
                                        <i className="cut icon"></i>
                                        </a>
                                    </p>
                                </div>
                                :
                                <div>
                                    <h1 style={{ textAlign: 'center' }}>
                                        Orders of {customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}:
                        </h1>
                                    <table className="ui celled table">
                                        <thead>
                                            <tr>
                                                <th>Arrival Date</th>
                                                <th>Arrival Hour</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orders.length > 0 ? order.orders.map(order => {
                                                return (
                                                    <FetchOrder
                                                        order={order}
                                                        key={order.id}
                                                        customerUsername={customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}
                                                    />
                                                );
                                            }) : null}
                                        </tbody>
                                        <tfoot className="full-width">
                                            <tr>
                                                <th></th>
                                                <th colSpan="4">
                                                    <div
                                                        className="ui right floated small primary labeled icon button"
                                                        onClick={e => history.push(`/order/create`)}
                                                    >
                                                        <i className="cut icon">
                                                        </i>
                                            Create Order
                                                 </div>

                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default Dashboard;