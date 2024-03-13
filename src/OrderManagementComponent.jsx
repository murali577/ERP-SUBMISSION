import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagementComponent = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ customerName: '', productName: '', quantity: 0, totalPrice: 0 });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        axios.post('/api/orders', newOrder)
            .then(() => {
                fetchOrders();
                setNewOrder({ customerName: '', productName: '', quantity: 0, totalPrice: 0 });
            })
            .catch(error => {
                console.error('Error saving order:', error);
            });
    };

    return (
        <div>
            <h1>Order Management</h1>
            <div>
                <input type="text" name="customerName" value={newOrder.customerName} onChange={handleInputChange} placeholder="Customer Name" />
                <input type="text" name="productName" value={newOrder.productName} onChange={handleInputChange} placeholder="Product Name" />
                <input type="number" name="quantity" value={newOrder.quantity} onChange={handleInputChange} placeholder="Quantity" />
                <input type="number" name="totalPrice" value={newOrder.totalPrice} onChange={handleInputChange} placeholder="Total Price" />
                <button onClick={handleSubmit}>Add Order</button>
            </div>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Customer: {order.customerName} - Product: {order.productName} - Quantity: {order.quantity} - Total Price: {order.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagementComponent;
