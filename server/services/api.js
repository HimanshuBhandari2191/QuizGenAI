import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/quiz';

export const generateQuiz = (prompt) => {
  return axios.post(`${API_URL}/generate`, { prompt });
};

export const getQuiz = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const submitQuiz = (quizId, answers, userName) => {
  return axios.post(`${API_URL}/submit`, { quizId, answers, userName });
};

export const getResults = () => {
  return axios.get(`${API_URL}/results/all`);
};

export const getUserResults = (username) => {
  return axios.get(`${API_URL}/results/user/${username}`);
};