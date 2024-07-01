const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // to parse JSON bodies

const questions = [
    "What is your favorite memory together?",
    "What do you appreciate most about each other?",
    "What was the best part of your day?",
    "What are you looking forward to the most?",
    "What is your favorite activity to do together?",
    "What is one thing you want to accomplish together?",
    "What is your favorite meal to have together?"
];

let answers = {}; // Store answers in memory

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint to get the question of the day
app.get('/api/question', (req, res) => {
    const today = new Date().getDay();
    const question = questions[today % questions.length];
    res.json({ question });
});

// API endpoint to get answers
app.get('/api/answers', (req, res) => {
    const today = new Date().toLocaleDateString();
    res.json({ answers: answers[today] || [] });
});

// API endpoint to post a new answer
app.post('/api/answer', (req, res) => {
    const today = new Date().toLocaleDateString();
    if (!answers[today]) {
        answers[today] = [];
    }
    answers[today].push(req.body.answer);
    res.json({ success: true });
});

// API endpoint to delete an answer
app.delete('/api/answer', (req, res) => {
    const { index } = req.body;
    const today = new Date().toLocaleDateString();
    if (answers[today]) {
        answers[today].splice(index, 1);
    }
    res.json({ success: true });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
