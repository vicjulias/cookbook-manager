const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);
router.get('/status', authCtrl.status)

module.exports = router;