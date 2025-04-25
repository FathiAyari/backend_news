const Quiz = require("../models/quizSchema");
const Formation = require("../models/formationSchema");

module.exports.addQuiz = async (req, res) => {
  try {
    const { formationId, questions } = req.body;

    if (!formationId || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Données invalides" });
    }

    for (let i = 0; i < questions.length; i++) {
      const { question, options, correctAnswerIndex } = questions[i];
      if (!question || !options || correctAnswerIndex === undefined) {
        return res.status(400).json({ message: "Une question est mal formatée" });
      }
    }

    const quiz = await Quiz.create({ formationId, questions });
    res.status(201).json(quiz);
  } catch (error) {
    console.log("test : " + error)
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("formationId");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un quiz par ID
module.exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("formationId");
    if (!quiz) return res.status(404).json({ message: "Quiz introuvable" });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un quiz
module.exports.updateQuiz = async (req, res) => {
  try {
    const { questions } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { questions },
      { new: true }
    );

    if (!quiz) return res.status(404).json({ message: "Quiz introuvable" });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un quiz
module.exports.deleteQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz introuvable" });

    res.status(200).json({ message: "Quiz supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soumettre un quiz et afficher la correction
module.exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, userAnswers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz introuvable" });

    if (!userAnswers || userAnswers.length !== quiz.questions.length) {
      return res.status(400).json({ message: "Réponses invalides" });
    }

    let score = 0;
    let correctAnswers = [];
    let passed = false;

    // Comparer les réponses de l'utilisateur avec celles du quiz
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const userAnswer = userAnswers[i];
      
      if (userAnswer === question.correctAnswerIndex) {
        score += 20;  // Ajouter 20 points pour chaque bonne réponse
        correctAnswers.push(question.options[question.correctAnswerIndex]);
      }
    }

    // Vérifier si l'utilisateur a réussi (score ≥ 10)
    passed = score >= 10;

    res.status(200).json({
      message: passed ? "Bravo, vous avez réussi !" : "Échec, essayez un autre quiz.",
      score: score,
      correctAnswers: correctAnswers,  // Retourner les bonnes réponses pour chaque question
      passed: passed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};