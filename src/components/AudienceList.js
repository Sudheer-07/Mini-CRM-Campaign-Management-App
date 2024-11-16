// frontend/src/components/AudienceSegmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const AudienceSegmentList = ({ setShowForm, setShowCampaignData }) => {
    const [segments, setSegments] = useState([]);
    const [activeMessageInputs, setActiveMessageInputs] = useState({}); // Track state for each segment

    const createCommunication = async (segment) => {
        const communicationData = { audienceSegmentId: segment._id, users: segment.users };

        try {
            const response = await axios.post('http://localhost:7000/api/v1/audience/communication/create', communicationData);
            if (response?.data?.success) {
                toast.success('Communication Created Successfully');
            }
        } catch (error) {
            toast.error('Failed to create Campaign.');
        }

        setActiveMessageInputs((prevState) => ({
            ...prevState,
            [segment._id]: { ...prevState[segment._id], toggleSend: true },
        }));
    };

    const handleSendMessage = async (segmentId) => {
        const message = activeMessageInputs[segmentId]?.message || '';
        const communicationData = { audienceSegmentId: segmentId, message };

        try {
            const response = await axios.post('http://localhost:7000/api/v1/audience/send/text', communicationData);
            if (response?.data?.success) {
                toast.success('Message sent Successfully');
                setActiveMessageInputs((prevState) => ({
                    ...prevState,
                    [segmentId]: { ...prevState[segmentId], message: '' },
                }));
            }
        } catch (error) {
            toast.error('Failed to send message.');
        }
    };

    const handleInputChange = (segmentId, value) => {
        setActiveMessageInputs((prevState) => ({
            ...prevState,
            [segmentId]: { ...prevState[segmentId], message: value },
        }));
    };

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/audience/');
                if (response?.data?.success) {
                    setSegments(response.data.data);
                }
            } catch (error) {
                toast.error('Failed to fetch segments.');
            }
        };
        fetchSegments();
    }, []);

    return (
        <div className="AudienceList">
            <h2>Audience Segments</h2>
            <div className="card-container">
                {segments.map((segment) => (
                    <div className="segment-card" key={segment._id}>
                        <div className="segment-details">
                            <h3 className="segment-title">{segment.name}</h3>

                            <p>
                                <strong>Audience Size:</strong> {segment.audienceSize}
                            </p>
                            <p>
                                <strong>Users:</strong>
                                <ul className="user-list">
                                    {segment.users.map((user) => (
                                        <li key={user._id}>
                                            {user.name} ({user.email})
                                        </li>
                                    ))}
                                </ul>
                            </p>
                        </div>
                        <div className="actions">
                            {activeMessageInputs[segment._id]?.toggleSend ? (
                                <div className="message-input">
                                    <label>Message</label>
                                    <input
                                        type="text"
                                        name="message"
                                        value={activeMessageInputs[segment._id]?.message || ''}
                                        onChange={(e) => handleInputChange(segment._id, e.target.value)}
                                        required
                                    />
                                </div>
                            ) : null}
                            <button
                                className={
                                    activeMessageInputs[segment._id]?.toggleSend ? 'send-btn' : 'action-btn'
                                }
                                onClick={() => {
                                    activeMessageInputs[segment._id]?.toggleSend
                                        ? handleSendMessage(segment._id)
                                        : createCommunication(segment);
                                }}
                            >
                                {activeMessageInputs[segment._id]?.toggleSend ? 'Send Message' : 'Want to Send Message'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AudienceSegmentList;
