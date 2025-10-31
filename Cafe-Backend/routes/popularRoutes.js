const express = require("express");
const { getPopularItems } = require("../controllers/popularController");

const router = express.Router();

router.get("/", getPopularItems);

module.exports = router;



