const router = require("express").Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/submit", feedbackController.postFeedback);

module.exports = router;
