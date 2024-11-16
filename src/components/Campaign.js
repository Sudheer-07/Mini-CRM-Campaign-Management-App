// frontend/src/components/CampaignForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

const CampaignForm = ({setShowForm}) => {
    const [audience, setAudience] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [audienceSegmentId, setAudienceSegmentId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleShowCampaignList=()=>{
        console.log("hchsdhjgjd")
        setShowForm(6);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaignData = { name, audienceSegmentId, message, startDate, endDate };

        try {
            const response = await axios.post('http://localhost:7000/api/v1/campaign/create', campaignData);

            if (response?.data?.success) {
                toast.success('Campaign Created Successfully');
                setMessage("");
                setAudienceSegmentId('');
                setName('');
                setStartDate('');
                setEndDate('');
            }

        } catch (error) {
            toast.error('Failed to create Campaign.');
        }

    };

    useEffect(() => {
        axios.get('http://localhost:7000/api/v1/audience/').then((customerRes) => {
            if (customerRes?.data?.success) {
                setAudience(customerRes?.data?.data)
            }
        })
    }, []);

    return (
        <div className="Campaign">
            <form onSubmit={handleSubmit}>
                <h2>Create Campaign</h2>

                <div style={{ marginBottom: '10px' }}>
                    <label>Audience:</label>
                    <select
                        name="audienceId"
                        value={audienceSegmentId}
                        onChange={(e) => { setAudienceSegmentId(e.target.value) }}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    >
                        <option value="">Select Audience</option>
                        {audience?.map((aud) => (
                            <option key={aud._id} value={aud._id}>
                                {aud.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Campaign Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit">Create Campaign</button>
                    <button type="button" onClick={handleShowCampaignList}>Show Campaign List</button>
                </div>

            </form>

            <ToastContainer />

        </div>
    );
};

export default CampaignForm;
