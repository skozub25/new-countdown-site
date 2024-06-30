import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionOfTheDay() {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/question')
            .then(response => {
                setQuestion(response.data.question);
            })
            .catch(error => {
                console.error('Error fetching the question of the day:', error);
            });

        const today = new Date().toLocaleDateString();
        const lastUpdate = localStorage.getItem('lastUpdate');

        if (today !== lastUpdate) {
            localStorage.setItem('lastUpdate', today);
            localStorage.setItem('answers', JSON.stringify([]));
        }

        const storedAnswers = JSON.parse(localStorage.getItem('answers')) || [];
        setAnswers(storedAnswers);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
        setNewAnswer('');
    };

    const handleDelete = (index) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    };

    return (
        <div>
            <h1>Question of the Day</h1>
            <p>{question}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Your answer"
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        {answer}
                        <button onClick={() => handleDelete(index)} className="delete-button">x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionOfTheDay;
