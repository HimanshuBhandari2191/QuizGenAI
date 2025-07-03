import React, { useState } from 'react';
import QuizGenerator from './components/QuizGenerator';
import QuizTaker from './components/QuizTaker';
import QuizResult from './components/QuizResult';
import './App.css';

function App() {
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [view, setView] = useState('generate'); // 'generate', 'take', 'result'

  return (
    <div className="app">
      <header>
        <h1>QuizGen AI</h1>
      </header>

      <main>
        {view === 'generate' && (
          <QuizGenerator 
            setQuiz={setQuiz}
            setView={setView}
            setUserName={setUserName}
          />
        )}

        {view === 'take' && quiz && (
          <QuizTaker 
            quiz={quiz}
            setUserAnswers={setUserAnswers}
            setView={setView}
          />
        )}

        {view === 'result' && quiz && userAnswers.length > 0 && (
          <QuizResult 
            quiz={quiz}
            userAnswers={userAnswers}
            userName={userName}
            setView={setView}
          />
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} QuizGen AI</p>
      </footer>
    </div>
  );
}

export default App;