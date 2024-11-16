// frontend/src/App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../Styling/Home.css';
import { setCookies } from '../Services/Cookies';
import { setAuthorizationToken } from '../Services/APIServices';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Home = () => {
    const [user, setUser] = useState(null);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        // Send the token to backend for verification and further processing
        const response = await axios.post('http://localhost:7000/api/v1/user/auth/google', { token });
        if (response?.data?.success) {
            setUser(response?.data?.data);
            setCookies('USER_TOKEN', response?.data?.token);
            setAuthorizationToken(response?.data?.token)
            // navigate('/dashboard');
        }
    };

    const handleGoogleLoginFailure = () => {
        console.log("Login failed");
    };

    return (
        <GoogleOAuthProvider clientId="481636912163-45npb9nu0aa7e2oa9nti7rk9ndv06ll7.apps.googleusercontent.com">
            <div>
                {user ? (
                    <Dashboard user={user} setUser={setUser} />
                ) : (
                    <div className="auth-button-container">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default Home;
