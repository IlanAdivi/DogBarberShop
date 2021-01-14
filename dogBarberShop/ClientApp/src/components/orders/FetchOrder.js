import React, { useState } from 'react';
import '../layout/styles.css';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteOrder, fetchOrderById } from '../../actions';

import Modal from 'react-modal';


function FetchOrder({ order, customerUsername }) {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const afterOpenModal = () => {
        console.log('after open');
    };

    const closeModal = () => {
        setIsOpen(false);
        console.log('close modal');
    }

    const onClickFetchOrder = async (e, orderId) => {
        e.preventDefault();
        await dispatch(fetchOrderById(orderId));
        history.push(`/order/${orderId}`);
    };

    const onUpdateOrder = async (e, orderId) => {
        e.preventDefault();
        history.push(`/order/update/${orderId}`);
    };

    return (
        <tr key={order.id}>
            <td
                className="selectable"
                id="hover"
                style={{ whiteSpace: "pre-line" }}
            >
                <a
                    data-tip={`
                    Customer Name: ${customerUsername}\n
                    Arrival Date: ${order.arrivalDate.slice(0, 10)}\n
                    Arrival Hour: ${order.arrivalHour}`
                    }
                    data-for="path"
                    href="!#"
                    onClick={e => onClickFetchOrder(e, order.id)}>
                    {order.arrivalDate.slice(0, 10)}
                </a>
                <ReactTooltip
                    id="path"
                    type="info"
                    place="top"
                />
            </td>

            <td
                className="selectable"
                id="hover"
                style={{ whiteSpace: "pre-line" }}
            >
                <a
                    data-tip={`
                    Customer Name: ${customerUsername}\n
                    Arrival Date: ${order.arrivalDate.slice(0, 10)}\n
                    Arrival Hour: ${order.arrivalHour}`
                    }
                    data-for="path"
                    href="!#"
                    onClick={e => onClickFetchOrder(e, order.id)}>
                    {order.arrivalHour}
                </a>
                <ReactTooltip
                    id="path"
                    type="info"
                    place="top"
                />
            </td>
            <td>
                <a
                    href="!#"
                    className="ui button"
                    onClick={e => onUpdateOrder(e, order.id)}
                >
                    Update
                </a>
            </td>
            <td>
                <a
                    href="!#"
                    className="ui red button"
                    onClick={e => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                >
                    Delete
                </a>
                <Modal
                    ariaHideApp={false}
                    isOpen={isOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                >

                    <h4>Delete Your Order</h4>

                    <div className="description">
                        <div className="header">
                            <p>Are you sure you want to delete your order?</p>
                        </div>
                    </div>
                    <br />
                    <div className="actions">
                        <div
                            className="ui red deny button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            No
    </div>
                        <div
                            className="ui positive button"
                            onClick={() => {
                                dispatch(deleteOrder(order.id));
                                closeModal();
                            }}
                        >
                            Yes
                        </div>
                    </div>

                </Modal>
            </td>
        </tr >
    );
}

export default FetchOrder;