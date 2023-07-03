const router = require('express').Router();
const postControl = require('../controllers/postControl');

router.post('/createPost', postControl.createPost);
router.get('/get-feed-posts', postControl.getFeedPosts);

module.exports = router;