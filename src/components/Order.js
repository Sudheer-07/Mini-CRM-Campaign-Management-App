// CreateOrderForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
    const [customers, setCustomers] = useState([]);
    const initialFormState = {
        customerId: '',
        items: [{ productName: '', quantity: 1, price: 0 }]
    };

    const [order, setOrder] = useState(initialFormState);

    // Handle input changes for the customerId and items
    const handleCustomerChange = (e) => {
        setOrder({ ...order, customerId: e.target.value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...order.items];
        updatedItems[index][name] = name === 'quantity' || name === 'price' ? Number(value) : value;
        setOrder({ ...order, items: updatedItems });
    };

    const addItem = () => {
        setOrder({
            ...order,
            items: [...order.items, { productName: '', quantity: 1, price: 0 }]
        });
    };

    const removeItem = (index) => {
        const updatedItems = order.items.filter((_, i) => i !== index);
        setOrder({ ...order, items: updatedItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Mock API call
            const response = await axios.post('http://localhost:7000/api/v1/order/create', order);

            if (response?.data?.success) {
                setOrder(initialFormState);  // Reset the form after success
                toast.success('Order Created Successfully');
            }

        } catch (error) {
            toast.error('Failed to create order.');
        }
    }

    console.log('Order Data:', order);
    // Add an API call here to submit the order data to the backend

    useEffect(() => {
        axios.get('http://localhost:7000/api/v1/customer/').then((customerRes) => {

            if (customerRes?.data?.success) {
                console.log("ghdsfgh : : ", customerRes?.data?.data);

                setCustomers(customerRes?.data?.data)
            }
        })

    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                {/* Customer Selection */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Customer:</label>
                    <select
                        name="customerId"
                        value={order.customerId}
                        onChange={handleCustomerChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer._id} value={customer._id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Items Section */}
                <h3>Items</h3>
                {order.items.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={item.productName}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            />
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                min="1"
                                required
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, e)}
                                min="0"
                                required
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            />
                        </div>
                        <button type="button" onClick={() => removeItem(index)} style={{ color: 'red', cursor: 'pointer' }}>
                            Remove Item
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addItem} style={{ margin: '10px 0', padding: '10px 20px', cursor: 'pointer' }}>
                    Add Item
                </button>

                {/* Submit Button */}
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Create Order
                </button>
            </form>

            <ToastContainer  />
        </div>
    );
};

export default OrderForm;
