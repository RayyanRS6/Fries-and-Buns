const express = require("express");
const { getMenuItems, getPopularItems, getItemsByCategory, addMenuItems, updateMenuItem, deleteMenuItem, updateMenuItemPopularity,createCategoryIfNotExists, getCategories } = require("../controllers/menuController");



const router = express.Router();

router.get("/", getPopularItems);
router.get("/menu", getMenuItems);
router.get("/menu/category/:category", getItemsByCategory);
router.post("/menu", addMenuItems);
router.delete("/menu/:name", deleteMenuItem);
router.put("/menu/item/:name", updateMenuItem);
router.put("/menu/:name", updateMenuItemPopularity);
router.post("/category", createCategoryIfNotExists);
router.get("/category", getCategories);

module.exports = router;
