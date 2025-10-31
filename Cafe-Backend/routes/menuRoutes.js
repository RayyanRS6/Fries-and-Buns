const express = require("express");
const { getMenuItems, addMenuItem, getPopularMenuItems, updateMenuItemPopularity } = require("../controllers/menuController");



const router = express.Router();

router.get("/", getPopularMenuItems);
router.get("/menu", getMenuItems);
router.post("/menu", addMenuItem);
router.put("/menu/:name", updateMenuItemPopularity);


module.exports = router;
