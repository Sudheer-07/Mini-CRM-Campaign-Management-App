import React from 'react';

const Card = ({ title, content, date }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{content}</p>
            {date && <p className="date">Sent at: {new Date(date).toLocaleString()}</p>}
        </div>
    );
};

export default Card;