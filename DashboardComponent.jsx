import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardComponent = () => {
    const [dashboardData, setDashboardData] = useState({
        totalEmployees: 0,
        totalProducts: 0,
        totalOrders: 0,
        // Add more dashboard metrics as needed
    });

    useEffect(() => {
        axios.get('/api/dashboard')
            .then(response => {
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <p>Total Employees: {dashboardData.totalEmployees}</p>
                <p>Total Products: {dashboardData.totalProducts}</p>
                <p>Total Orders: {dashboardData.totalOrders}</p>
                {/* Display more dashboard metrics */}
            </div>
        </div>
    );
};

export default DashboardComponent;
