import React from 'react';
import axios from 'axios';
import '../App.css'

function AudienceCalculator({ conditions, setAudienceSize,setCalcultedAudienceUsers, conditionType}) {
  const calculateAudience = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/v1/audience/calculate', { conditions, conditionType });
      console.log("response : : ", response);
      setAudienceSize(response.data.audienceSize);
      setCalcultedAudienceUsers(response.data.users);
    } catch (error) {
      console.error("Error calculating audience", error);
    }
  };

  return (
    <div>
      <button onClick={calculateAudience} className='calculateButton'>
        Calculate Audience Size
      </button>
    </div>
  );
}

export default AudienceCalculator;
