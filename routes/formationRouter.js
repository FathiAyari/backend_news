var express = require('express');
var router = express.Router();
const formationController = require('../controllers/formationController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */


router.get('/formations', formationController.getAllFormations);
router.post('/formation', formationController.addFormation);
router.get('/formations/:departement', formationController.getFormationByDep);
router.delete('/formation/:id', formationController.deleteFormationById);


router.get('/getFormationById/:id',requireAuthUser, authorizeRole("admin"), formationController.getFormationById);
router.put('/updateFormation/:id',requireAuthUser, authorizeRole("admin"),requireAuthUser, authorizeRole("admin"),formationController.updateFormation);
router.put('/affect', formationController.affect);
router.put('/desaffect', formationController.desaffect );
router.delete('/deleteFormationById/:id',requireAuthUser, authorizeRole("admin"), formationController.deleteFormationById);

module.exports = router;


