const menu_items = require("../models/menuItems");

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const items = await menu_items.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Get all popular menu items
const getPopularMenuItems = async (req, res) => {
    try {
        const items = await menu_items.find({ isPopular: true });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Add a new menu item
const addMenuItem = async (req, res) => {
    const { id, name, price, image, category, description, isPopular } = req.body;
    const newItem = new menu_items({ id, name, price, image, category, description, isPopular });
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Update popularity status of a menu item
const updateMenuItemPopularity = async (req, res) => {
    try{
        const item = await menu_items.findOneAndUpdate({name: req.params.name}, {isPopular: req.body.isPopular}, {new: true});
        if(!item){
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getMenuItems, addMenuItem, getPopularMenuItems, updateMenuItemPopularity };
