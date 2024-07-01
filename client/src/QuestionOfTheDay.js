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

        axios.get('http://localhost:3001/api/answers')
            .then(response => {
                setAnswers(response.data.answers);
            })
            .catch(error => {
                console.error('Error fetching answers:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/answer', { answer: newAnswer })
            .then(response => {
                setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
                setNewAnswer('');
            })
            .catch(error => {
                console.error('Error submitting answer:', error);
            });
    };

    const handleDelete = (index) => {
        axios.delete('http://localhost:3001/api/answer', { data: { index } })
            .then(response => {
                setAnswers(prevAnswers => prevAnswers.filter((_, i) => i !== index));
            })
            .catch(error => {
                console.error('Error deleting answer:', error);
            });
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
