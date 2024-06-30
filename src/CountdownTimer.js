import React, { useState, useEffect, useCallback } from 'react';

function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = useCallback(() => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [calculateTimeLeft]);

    return (
        <div>
            
            <div>
                {Object.keys(timeLeft).length ? (
                    Object.keys(timeLeft).map((interval, index) => (
                        <span key={index}>
                            {timeLeft[interval]} {interval}{" "}
                        </span>
                    ))
                ) : (
                    <span>Time's up!</span>
                )}
            </div>
        </div>
    );
}

export default CountdownTimer;
