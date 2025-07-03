import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
  },
  userName: String,
  score: { 
    type: Number, 
    required: true 
  },
  total: { 
    type: Number, 
    required: true 
  },
  answers: [String],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('QuizResult', resultSchema);