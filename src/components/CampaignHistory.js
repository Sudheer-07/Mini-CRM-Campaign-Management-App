// frontend/src/components/CampaignHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignHistory = ({ showCampaign }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await axios.get(`http://localhost:7000/api/v1/campaign/${showCampaign?.audienceId}`);

            console.log("response datata : ", response)
            setCampaigns(response.data.data);
        };

        fetchCampaigns();
    }, [showCampaign?.audienceId]);

    return (
        <div>
            <h2>Campaign History</h2>
            <ul>
                {campaigns.map((campaign) => (
                    <li key={campaign._id}>
                        <strong>{campaign.name}</strong> - {campaign.message} (Sent at: {new Date(campaign.sentAt).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampaignHistory;