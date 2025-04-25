var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */
// router.get('/getAllFormations', formationController.getAllFormations);
// router.get('/getFormationById/:id', formationController.getFormationById);
// router.post('/addFormation', formationController.addFormation);
// router.put('/updateFormation/:id',formationController.updateFormation);
// router.put('/affect', formationController.affect);
// router.put('/desaffect', formationController.desaffect );
// router.delete('/deleteFormationById/:id', formationController.deleteFormationById);

module.exports = router;


