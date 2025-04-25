const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    formationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' },
    questions: [
      {
        question: String,
        options: [String],  // Tableau des options pour chaque question
        correctAnswerIndex: Number,  // Index de la bonne réponse dans le tableau des options
      }
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
