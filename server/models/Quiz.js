import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: String,
    options: [String],
    answer: String,
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema({
  prompt: String,
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', quizSchema);