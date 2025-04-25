var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {requireAuthUser} = require('../midlewares/authMiddleware');
const {authorizeRole} = require('../midlewares/authorizeRole');



/* GET users listing. */

router.post('/addUserEmployeur',requireAuthUser, authorizeRole("admin"), userController.addUserEmployeur);
router.post('/addUserAdmin',userController.addUserAdmin);

router.post('/signin', userController.SignIn);
router.post('/signup', userController.SignUp);



router.get('/getAllUsers',requireAuthUser, authorizeRole("admin"),userController.getAllUsers);

router.get('/getUserById/:id',requireAuthUser, authorizeRole("admin"),userController.getUserById); 
router.get('/searchUserByUsername',requireAuthUser, authorizeRole("admin"),userController.searchUserByUsername); 
router.get('/getAllUsersSortByAge',requireAuthUser, authorizeRole("admin"),userController.getAllUsersSortByAge); 
router.get('/getAllEmployeur',requireAuthUser, authorizeRole("admin"),userController.getAllEmployeur); 
router.get('/getNotificationsForUser',requireAuthUser, authorizeRole("admin"),userController.getNotificationsForUser);

router.post('/addUserStagaire', requireAuthUser, authorizeRole("admin"),userController.addUserStagaire);
router.get('/getAllStagaires',requireAuthUser, authorizeRole("admin"),userController.getAllStagaires);

router.get("/admin-dashboard", requireAuthUser, authorizeRole("admin"), (req, res) => {
    res.send("Bienvenue dans le dashboard admin !");})
router.delete('/deleteUserById/:id',requireAuthUser, authorizeRole("admin"),userController.deleteUserById); 
module.exports = router;