import { OpenAI } from 'openai';
import Quiz from '../models/Quiz.js';
import QuizResult from '../models/QuizResult.js';

export const generateQuiz = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt)
    return res.status(400).json({ error: 'Prompt missing' });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const ai = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `Return ONLY JSON.
Generate 3 multiple‑choice questions on: ${prompt}
Each object must have:
  "question": string,
  "options": array of 4 strings,
  "answer": string (exact text of the correct option)`,
        },
      ],
    });

    const questions = JSON.parse(
      ai.choices[0].message.content.trim()
    );

    const quiz = await Quiz.create({ prompt, questions });
    res.status(201).json(quiz);
  } catch (err) {
    console.error('❌ OpenAI/save error:', err.message);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
};

export const getAllQuizzes = async (_req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error('❌ Fetch quizzes error:', err.message);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error('❌ Fetch quiz error:', err.message);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, answers, userName } = req.body;
  
  if (!quizId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid submission data' });
  }

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    // Calculate score
    let score = 0;
    const results = quiz.questions.map((question, index) => ({
      question: question.question,
      correctAnswer: question.answer,
      userAnswer: answers[index],
      isCorrect: question.answer === answers[index]
    }));

    results.forEach(result => {
      if (result.isCorrect) score++;
    });

    // Save result
    const result = await QuizResult.create({
      quizId,
      userName,
      score,
      total: quiz.questions.length,
      answers
    });

    res.status(201).json({
      score,
      total: quiz.questions.length,
      resultId: result._id,
      results
    });
  } catch (err) {
    console.error('❌ Quiz submission error:', err.message);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

export const getAllResults = async (_req, res) => {
  try {
    const results = await QuizResult.find()
      .sort({ createdAt: -1 })
      .populate('quizId', 'prompt createdAt');
      
    res.json(results);
  } catch (err) {
    console.error('❌ Fetch results error:', err.message);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userName: req.params.user })
      .sort({ createdAt: -1 })
      .populate('quizId', 'prompt createdAt');
      
    res.json(results);
  } catch (err) {
    console.error('❌ Fetch user results error:', err.message);
    res.status(500).json({ error: 'Failed to fetch user results' });
  }
};