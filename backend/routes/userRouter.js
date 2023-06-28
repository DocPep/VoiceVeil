const router = require('express').Router();
const userControl = require('../controllers/userControl');

router.post('/register', userControl.registerUser);
router.post('/login', userControl.loginUser);

module.exports = router;