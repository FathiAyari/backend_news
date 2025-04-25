var express = require('express');
var router = express.Router();
const certificatController = require('../controllers/certificatController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');

/* GET home page. */
router.get('/getAllCertificats',requireAuthUser, authorizeRole("admin"), certificatController.getAllCertificats );
router.get('/getCertificatById/:id',requireAuthUser, authorizeRole("admin"), certificatController.getCertificatById );
router.post('/addCertificat',requireAuthUser, authorizeRole("admin"), certificatController.addCertificat );
router.put('/updateCertificat/:id',requireAuthUser, authorizeRole("admin"), certificatController.updateCertificat);
router.put('/affect', certificatController.affect);
router.put('/desaffect', certificatController.desaffect);
router.delete('/deleteCertificatById/:id',requireAuthUser, authorizeRole("admin"), certificatController.deleteCertificatById);
module.exports = router;