var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');

/* GET home page. */

router.get('/articles', articleController.getAllArticles );
router.post('/article', articleController.addArticle );


router.get('/getArticleById/:id',requireAuthUser, authorizeRole("admin"), articleController.getArticleById );
router.put('/updateArticle/:id',requireAuthUser, authorizeRole("admin"), articleController.updateArticle);
router.put('/affect',requireAuthUser, authorizeRole("admin"), articleController.affect);
router.put('/desaffect', requireAuthUser, authorizeRole("admin"),articleController.desaffect);
router.delete('/deleteArticleById/:id',requireAuthUser, authorizeRole("admin"), articleController.deleteArticleById);
module.exports = router;