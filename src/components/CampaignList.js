// frontend/src/components/CampaignHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/v1/campaign/`);
                if (response?.data?.success) {
                    setCampaigns(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch campaigns:", error);
            }
        };

        fetchCampaigns();
    }, []);
console.log("vdsghv")
    return (
        <div className="CampaignList">
            <h2>Campaign List</h2>
            <div className="campaign-container">
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <div className="campaign-card" key={campaign._id}>
                            <h3 className="campaign-name">{campaign.name}</h3>
                            <p className="campaign-field">
                                <strong>Message:</strong> {campaign.message}
                            </p>
                            <p className="campaign-field">
                                <strong>Audience Segment ID:</strong> {campaign.audienceSegmentId}
                            </p>
                            <p className="campaign-field">
                                <strong>Start Date:</strong>{" "}
                                {new Date(campaign.startDate).toLocaleDateString()}
                            </p>
                            <p className="campaign-field">
                                <strong>End Date:</strong>{" "}
                                {new Date(campaign.endDate).toLocaleDateString()}
                            </p>
                           
                        </div>
                    ))
                ) : (
                    <p>No campaigns available.</p>
                )}
            </div>
        </div>
    );
};

export default CampaignList;
