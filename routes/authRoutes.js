const router = require('express').Router();
const controller = require('../controller/authController');

router.get('/register', controller.showRegister);
router.post('/register', controller.register);

router.get('/login', controller.showLogin);
router.post('/login', controller.login);

router.post('/logout', controller.logout);

module.exports = router;
