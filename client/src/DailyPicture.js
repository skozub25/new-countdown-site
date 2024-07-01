import React, { useState, useEffect } from 'react';

function DailyPicture({ pictures }) {
    const [currentPicture, setCurrentPicture] = useState('');

    useEffect(() => {
        const dayIndex = new Date().getDate() % pictures.length;
        setCurrentPicture(pictures[dayIndex]);
    }, [pictures]);

    return (
        <div className="media-item">
            <h2>Picture of the Day</h2>
            <img src={currentPicture} alt="Daily" />
        </div>
    );
}

export default DailyPicture;
