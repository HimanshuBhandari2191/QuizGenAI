import React from 'react';
import './QuizComponents.css';
const QuizResult = ({ quiz, userAnswers, userName, setView }) => {
  // Calculate score
  let score = 0;
  const results = quiz.questions.map((question, index) => {
    const isCorrect = question.answer === userAnswers[index];
    if (isCorrect) score++;
    
    return {
      question: question.question,
      correctAnswer: question.answer,
      userAnswer: userAnswers[index],
      isCorrect
    };
  });

  const percentage = Math.round((score / quiz.questions.length) * 100);
  
  // Determine performance message
  let performance = '';
  if (percentage >= 90) performance = 'Excellent!';
  else if (percentage >= 70) performance = 'Good job!';
  else if (percentage >= 50) performance = 'Not bad!';
  else performance = 'Keep practicing!';

  return (
    <div className="card">
      <h2>Quiz Results</h2>
      <p>Quiz Topic: {quiz.prompt}</p>
      <p>Participant: {userName}</p>
      
      <div className="summary">
        <h3>
          Your Score: {score}/{quiz.questions.length} ({percentage}%)
        </h3>
        <p>{performance}</p>
      </div>
      
      <div className="detailed-results">
        <h3>Question Breakdown:</h3>
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`question-result ${result.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <h4>Question {index + 1}: {result.question}</h4>
            <p>Your answer: {result.userAnswer || 'No answer'}</p>
            <p>Correct answer: {result.correctAnswer}</p>
          </div>
        ))}
      </div>
      
      <div className="actions">
        <button onClick={() => setView('generate')}>
          Create New Quiz
        </button>
        <button onClick={() => setView('take')}>
          Retry This Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;