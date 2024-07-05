import React from 'react';
import CountdownTimer from './CountdownTimer';
import DailyPicture from './DailyPicture';
import QuestionOfTheDay from './QuestionOfTheDay';
import VideoOfTheDay from './VideoOfTheDay';
import './App.css';

function App() {
    const targetDate = '2024-07-07T16:00:00-05:00'; // Correct target date: July 7th, 2024 at 4 PM Central Time

    const pictures = [
        '/images/image1.jpg',
        '/images/image2.jpg',
        '/images/image3.jpg',
        '/images/image4.jpg',
        '/images/image5.jpg'
        // Add more URLs of your pictures
    ];
    const videos = [
       
        '/videos/vid4.mp4'

        // Add more URLs of your videos
    ];

    return (
        <div className="App">
            <header>
                <h1>Luke Stockbridge. I miss you!</h1>
                <CountdownTimer targetDate={targetDate} />
            </header>
            <div className="media-container">
                <DailyPicture pictures={pictures} />
                <VideoOfTheDay videos={videos} />
            </div>
            <div className="question-container">
                <QuestionOfTheDay />
            </div>
        </div>
    );
}

export default App;
