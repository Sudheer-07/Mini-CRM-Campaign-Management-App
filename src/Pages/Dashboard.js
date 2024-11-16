import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Customer from '../components/Customer';
import OrderForm from '../components/Order';
import Audience from '../components/Audience';
import Campaign from '../components/Campaign';
import AudienceSegmentList from '../components/AudienceList';
import CampaignList from '../components/CampaignList';

let obj = {
    customer: 1,
    order: 2,
    audience: 3,
    campaign: 4,
    audienceList: 5,
    campaignList: 6
}

function Dashboard({ user, setUser }) {
    let initialState = {
        show: false,
        audienceId: ""
    }
    const [showForm, setShowForm] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [showCampaign, setShowCampaignData] = useState(initialState)

    useEffect(() => {
        axios.get('http://localhost:7000/api/v1/customer/').then((customerRes) => {

            if (customerRes?.data?.success) {
                console.log("ghdsfgh : : ", customerRes?.data?.data);

                setCustomers(customerRes?.data?.data)
            }
        })

    }, []);

    return (
        <div>
            <Header userDetails={user} setShowForm={setShowForm} />

            {
                showForm == obj?.customer ?
                    <Customer />
                    :
                    showForm == obj?.order ?
                        <OrderForm customers={customers} />
                        :
                        showForm == obj?.audience ?
                            <Audience /> :
                            showForm == obj?.campaign ?
                                <Campaign setShowForm={setShowForm}/> :
                                showForm == obj?.audienceList ?
                                    <AudienceSegmentList setShowForm={setShowForm} setShowCampaignData={setShowCampaignData} /> :
                                    showForm == obj?.campaignList  ?
                                        <CampaignList /> :
                                        ""
            }


            {/* <div>
                <h2>Welcome, {user?.name}</h2>
                <img src={user?.picture} alt="Profile" />
                <button onClick={() => axios.get('/auth/logout').then(() => setUser(null))}>
                    Logout
                </button>
            </div> */}
        </div>
    )
}

export default Dashboard
