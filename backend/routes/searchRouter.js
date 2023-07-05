const router = require("express").Router();
const searchControl = require("../controllers/searchControl");

router.get("/explorePage", searchControl.searchQuery);

module.exports = router;
