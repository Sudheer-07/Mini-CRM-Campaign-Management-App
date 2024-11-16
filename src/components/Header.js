import React from 'react';

const Header = ({ userDetails, setShowForm }) => {

    const onLogout = () => {
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {userDetails && (
                    <>
                        <button className="logout-button" onClick={() => { setShowForm(5) }}>Audience List</button>
                        <button className="logout-button" onClick={() => { setShowForm(4) }}>Create Campaign</button>
                        <button className="logout-button" onClick={() => { setShowForm(3) }}>Calculate Audience</button>
                        <button className="logout-button" onClick={() => { setShowForm(2) }}>Create Order</button>
                        <button className="logout-button" onClick={() => { setShowForm(1) }}>Create Customer</button>
                        <img src={userDetails.picture} alt="Profile" className="profile-picture" />
                        <span className="username">{userDetails.name}</span>
                        <button className="logout-button" onClick={onLogout}>Logout</button>
                    </>
                )}


            </div>
        </nav>
    );

}
export default Header;
