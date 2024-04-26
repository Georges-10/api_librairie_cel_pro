const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../routes/auth');

router.get('/:id',auth,userController.getUserById);

router.post('/create',userController.createUser);

router.post('/login',userController.userLogin);

router.post('/logout',userController.userLogout);
module.exports = router;