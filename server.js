const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

const questions = [
    "What is your favorite memory together?",
    "What do you appreciate most about each other?",
    "What was the best part of your day?",
    "What are you looking forward to the most?",
    "What is your favorite activity to do together?",
    "What is one thing you want to accomplish together?",
    "What is your favorite meal to have together?"
];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint to get the question of the day
app.get('/api/question', (req, res) => {
    const today = new Date().getDay();
    const question = questions[today % questions.length];
    res.json({ question });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//this is server site for backkend