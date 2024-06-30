import React, { useState, useEffect } from 'react';

function VideoOfTheDay({ videos }) {
    const [currentVideo, setCurrentVideo] = useState('');

    useEffect(() => {
        const dayIndex = new Date().getDate() % videos.length;
        setCurrentVideo(videos[dayIndex]);
    }, [videos]);

    return (
        <div className="media-item">
            <h2>Video of the Day</h2>
            {currentVideo && (
                <video controls>
                    <source src={currentVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}

export default VideoOfTheDay;
