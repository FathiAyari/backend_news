var express = require('express');
var router = express.Router();
const alerteController = require('../controllers/alerteController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');
/* GET home page. */


router.post('/alerte', alerteController.addAlerte);
router.get('/alertes/:departement', alerteController.getAlerteByDep);
router.get('/alertes', alerteController.getAllAlertes);


router.get('/getAllAlertes',requireAuthUser, authorizeRole("admin"), alerteController.getAllAlertes);
router.put('/updateAlerte/:id',requireAuthUser, authorizeRole("admin"),alerteController.updateAlerte);
router.put('/affect', alerteController.affect);
router.put('/desaffect', alerteController.desaffect );
router.delete('/deleteAlerteId/:id',requireAuthUser, authorizeRole("admin"), alerteController.deleteAlerteById);

module.exports = router;


