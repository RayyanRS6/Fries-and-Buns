const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    isPopular: { type: Boolean, default: false }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema, "menu_items");

module.exports = MenuItem;
