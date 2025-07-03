import React, { useState } from 'react';
import { generateQuiz } from '../services/api';

const QuizGenerator = ({ setQuiz, setView, setUserName }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await generateQuiz(prompt);
      setQuiz(response.data);
      setView('take');
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Generate New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input 
            type="text" 
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        
        <label>
          Enter quiz topic:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., JavaScript promises, React hooks, Python data structures..."
            rows={3}
            required
          />
        </label>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default QuizGenerator;