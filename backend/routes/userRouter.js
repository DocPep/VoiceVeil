const router = require('express').Router();
const userControl = require('../controllers/userControl');

router.post('/register', userControl.registerUser);
router.post('/login', userControl.loginUser);
router.get('/getData', userControl.getUserData);
router.post('/follow', userControl.follow);
router.post('/unfollow', userControl.unfollow);

module.exports = router;