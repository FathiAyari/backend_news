const express = require('express');
const router = express.Router();

const preferenceController = require('../controllers/preferenceController');
const {requireAuthUser} = require('../midlewares/authMiddleware');

router.post('/setOrUpdatePreference', requireAuthUser, preferenceController.setOrUpdatePreference);


module.exports = router;
