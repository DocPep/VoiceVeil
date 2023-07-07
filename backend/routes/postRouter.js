const router = require('express').Router();
const postControl = require('../controllers/postControl');

router.post('/createPost', postControl.createPost);
router.get('/get-feed-posts', postControl.getFeedPosts);
router.get('/getpost', postControl.getPost);
router.post('/updatePost', postControl.updatePost);

module.exports = router;