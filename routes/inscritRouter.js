var express = require('express');
var router = express.Router();
const inscritController = require('../controllers/inscritController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */
// router.get('/getAllInscrits', inscritController.getAllInscrits);
router.get('/getInscritById/:id',requireAuthUser, authorizeRole("admin"), inscritController.getInscritById);
router.post('/addInscrit', requireAuthUser, authorizeRole("admin"),inscritController.addInscrit);
router.put('/updateInscrit/:id',requireAuthUser, authorizeRole("admin"),inscritController.updateInscrit);
router.put('/affect', inscritController.affect);
router.put('/desaffect', inscritController.desaffect );
router.delete('/deleteInscritById/:id', inscritController.deleteInscritById);

module.exports = router;


