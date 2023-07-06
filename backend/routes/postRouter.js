const router = require('express').Router();
const postControl = require('../controllers/postControl');

router.post('/createPost', postControl.createPost);
router.get('/get-feed-posts', postControl.getFeedPosts);
router.get('/getpost', postControl.getPost);

module.exports = router;