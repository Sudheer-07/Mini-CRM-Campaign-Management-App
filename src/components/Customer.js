import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
    let initialFormState = {
        name: '',
        email: '',
        phone: '',
        address: ''
    }
    const [customer, setCustomer] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Customer Data:', customer);

        try {
            // Mock API call
            const response = await axios.post('http://localhost:7000/api/v1/customer/create', customer);
            if (response?.data?.success) {
                setCustomer(initialFormState);  // Reset the form after success
                toast.success('Customer Created Successfully');
            }

        } catch (error) {
            toast.error('Failed to create customer.');
        }

        // You can add an API call here to send the data to a backend server
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Create Customer</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={customer.address}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Create Customer</button>
            </form>

            <ToastContainer />

        </div>
    );
};

export default Customer;
