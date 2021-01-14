import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import LogoutMenu from '../layout/menu/LogoutMenu';

function SelectedOrder() {
    const selectedOrder = useSelector(state => {
        console.log(state.order.orders);
        return state.order.orders;
    });

    const auth = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    const { customer } = auth;

    console.log(selectedOrder);

    return (
        !selectedOrder ?
            <Loader />
            :
            <div>
                <LogoutMenu />
                <div className="ui container">
                    <br />
                    <br />
                    <br />
                    <h1
                        style={{
                            textAlign: "center"
                        }}
                    >Order Details:</h1>
                    <br />
                    <div className="ui celled list">
                        <div className="item">
                            <div className="content">
                                <div className="header">Username: </div>
                                {customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Arrival Date: </div>
                                {selectedOrder.arrivalDate ? selectedOrder.arrivalDate.slice(0, 10) : null}
                            </div>
                        </div>

                        <div className="item">
                            <div className="content">
                                <div className="header">Arrival Hour: </div>
                                {selectedOrder.arrivalHour}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default SelectedOrder;