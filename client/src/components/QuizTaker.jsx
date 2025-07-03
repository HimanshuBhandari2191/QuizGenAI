import React, { useState, useEffect } from 'react';
import './QuizComponents.css';
const QuizTaker = ({ quiz, setUserAnswers, setView }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per quiz

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setUserAnswers(answers);
    setView('result');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="card">
      <div className="timer">
        Time Remaining: {formatTime(timeLeft)}
      </div>
      
      <h2>Question {currentQuestion + 1} of {quiz.questions.length}</h2>
      <h3>{question.question}</h3>
      
      <div className="options">
        {question.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              checked={answers[currentQuestion] === option}
              onChange={() => handleAnswerSelect(option)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        
        {currentQuestion < quiz.questions.length - 1 ? (
          <button onClick={handleNext} disabled={!answers[currentQuestion]}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={!answers[currentQuestion]}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizTaker;