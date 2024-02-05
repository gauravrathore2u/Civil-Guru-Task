const router = require('express').Router();
const userController = require('../controller/userController.js')

router.post('/userRegister', userController.userRegister);
router.post('/login', userController.login);
router.get('/allUsers', userController.getAllUsers);
router.post('/verifyToken', userController.verifyToken);


module.exports = router;