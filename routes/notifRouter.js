var express = require('express');
var router = express.Router();
const notifController = require('../controllers/notifController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');


/* GET home page. */

router.post('/sendToDepartement',requireAuthUser, authorizeRole("admin"),notifController.sendNotificationToDepartment);
// router.put('/updateNotif/:id',notifController.updateNotif);
// router.put('/affect', notifController.affect);
// router.put('/desaffect', notifController.desaffect );
// router.delete('/deleteNotifById/:id', notifController.deleteNotifById);

module.exports = router;


