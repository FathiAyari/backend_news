var express = require('express');
var router = express.Router();
const quizController = require('../controllers/quizController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');

router.post("/quiz", quizController.addQuiz);
router.get('/quizes', quizController.getAllQuizzes);



router.get("/getQuizById/:id", quizController.getQuizById);
router.put("/updateQuiz/:id", quizController.updateQuiz);
router.delete("/deleteQuizById/:id", quizController.deleteQuizById);
router.post("/submitQuiz", quizController.submitQuiz);

module.exports = router;


