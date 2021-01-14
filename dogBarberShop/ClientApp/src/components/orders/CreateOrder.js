import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import LogoutMenu from '../layout/menu/LogoutMenu';
import { existEmptyProperty } from '../../utils/emptyItem';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions';
import { useHistory } from 'react-router-dom';

function CreateOrder() {

    const [order, setOrder] = useState({
        arrivalDate: null,
        arrivalHour: null,
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector(state => {
        console.log(state.auth);
        return state.auth;
    });

    console.log(order);

    const { customer } = auth;

    console.log(customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);

    const customerId = customer.unique_name;

    const onSubmit = async e => {
        e.preventDefault();
        const response = await dispatch(createOrder(order, customerId));
        console.log(response);
        if (response.status === 200) {
            history.push('/dashboard');
        } else {
            setErrors(response.errors);
            console.log(errors);
        }
    };

    return (
        <div>
            <LogoutMenu />
            <br />
            <div className="ui container">
                <h3
                    className="ui dividing header">
                    {customer['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']}, create your order:</h3>
                <br />
                <form className="ui form">
                    <div className="field">
                        <label>Arrival Date</label>
                        <DatePicker
                            name="arrivalDate"
                            placeholderText="DD/MM/YYYY"
                            selected={order.arrivalDate}
                            onChange={date => setOrder({
                                ...order,
                                arrivalDate: date
                            })}
                            minDate={new Date()}
                            id={errors.arrivalDate || errors.date ? "error-border-color" : ""}
                        />
                        <div
                            style={{ color: errors.arrivalDate ? 'red' : '' }}>
                            {errors.arrivalDate}
                        </div>
                    </div>

                    <div className="field">
                        <label>Arrival Hour</label>
                        <DatePicker
                            name="arrivalHour"
                            placeholderText="h:mm aa"
                            selected={order.arrivalHour}
                            onChange={date => setOrder({
                                ...order,
                                arrivalHour: date
                            })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            id={errors.ArrivalHour ? "error-border-color" : ""}
                        />
                        <div
                            style={{ color: errors.ArrivalHour ? 'red' : '' }}>
                            {errors.ArrivalHour}
                        </div>
                    </div>
                    <br />
                    <button
                        className="ui black button"
                        type="submit"
                        disabled={existEmptyProperty(order) ? true : false}
                        onClick={onSubmit}
                    >
                        Create
                        <i
                            className="plus square outline icon"
                            style={{ margin: '5px' }}
                        >
                        </i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateOrder;