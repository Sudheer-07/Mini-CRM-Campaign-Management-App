import React, { useState } from 'react';
import axios from 'axios';
import ConditionBuilder from './ConditionBuilder';
import AudienceCalculator from './AudienceCalculator';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Audience = () => {
    const [conditions, setConditions] = useState([]);
    const [audienceSize, setAudienceSize] = useState(0);
    const [calculatedAudienceUsers, setCalcultedAudienceUsers] = useState([]);
    const [audienceName, setAudienceName] = useState("");
    const [conditionType, setConditionType] =useState("and");

    const handleSaveSegment = async () => {
        try {
            const response = await axios.post('http://localhost:7000/api/v1/audience/create', { name: audienceName, conditions, audienceSize, users: calculatedAudienceUsers });

            if (response?.data?.success) {
                toast.success('Audience Segment Created Successfully');
            }
        } catch (error) {
            toast.success('Failed to create Audience Segment ');
        }
    };

    return (
        <div className='App'>
            <h1 className='title'>Audience Segmentation Tool</h1>
            <ConditionBuilder conditions={conditions} setConditions={setConditions} setConditionType={setConditionType}/>
            <AudienceCalculator conditions={conditions} setAudienceSize={setAudienceSize} setCalcultedAudienceUsers={setCalcultedAudienceUsers} conditionType={conditionType} />
            <h2 className='audienceSize'>Audience Size: {audienceSize}</h2>

            <div>
                <div style={{ display: 'flex', maxWidth: '600px', width: '100%', alignItems: 'center', margin: '0 auto', justifyContent: 'center' }}>
                    <label>Audience Segment Name:</label>
                    <input
                        type="text"
                        name="audienceName"
                        value={audienceName}
                        onChange={(e) => setAudienceName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px',margin: '5px 0px',maxWidth: '200px',width: '100%', padding:'8px' }}
                    />
                </div>


                <button onClick={handleSaveSegment} className='calculateButton'>
                    Create Audience Segment
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Audience;
