import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const OrderCalendarView = () => {
    const [orders, setOrders] = useState([]);

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

    const events = orders.map(order => ({
        title: order.productName,
        start: order.orderDate, // Assuming you have a field 'orderDate' in your order entity
        end: order.deliveryDate, // Assuming you have a field 'deliveryDate' in your order entity
    }));

    return (
        <div>
            <h1>Order Calendar View</h1>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
};

export default OrderCalendarView;

