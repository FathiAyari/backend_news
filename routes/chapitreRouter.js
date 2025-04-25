var express = require('express');
var router = express.Router();
const chapitreController = require('../controllers/chapitreController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */
 router.get('/getAllChapitre',requireAuthUser, authorizeRole("admin"), chapitreController.getAllChapitre);
 router.get('/getChapitreById/:id',requireAuthUser, authorizeRole("admin"), chapitreController.getChapitreById);
router.post('/addChapitre',requireAuthUser, authorizeRole("admin"), chapitreController.addChapitre);
router.put('/updateChapitre/:id',requireAuthUser, authorizeRole("admin"),chapitreController.updateChapitre);
router.put('/affect',requireAuthUser, authorizeRole("admin"), chapitreController.affect);
router.put('/desaffect',requireAuthUser, authorizeRole("admin"), chapitreController.desaffect );
router.delete('/deleteChapitreById/:id',requireAuthUser, authorizeRole("admin"), chapitreController.deleteChapitreById);

module.exports = router;


