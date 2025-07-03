import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/quiz',
});

// API methods
export const generateQuiz = (prompt) => {
  return api.post('/generate', { prompt });
};

export const getQuiz = (id) => {
  return api.get(`/${id}`);
};

export const submitQuiz = (quizId, answers, userName) => {
  return api.post('/submit', { quizId, answers, userName });
};

export const getResults = () => {
  return api.get('/results/all');
};

export default api;