import React from 'react';

function CustomersList({ customer, index }) {
    return (
        <tr key={index}>
            <td>{customer.username}</td>
            <td>{customer.firstname}</td>
        </tr>
    );
}

export default CustomersList;