const { json } = require("express");
const prisma = require("../prismaClient");

// Get all menu items
const getMenuItems = async (req, res ) => {
    try{
        const items = await prisma.menuItem.findMany({
           include: { category: true }
    });
        res.json(items);
} catch (err) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
};

// Get only popular items
const getPopularItems = async (req, res) => {
  try {
    const popularItems = await prisma.menuItem.findMany({
      where: { isPopular: true }
    });
    res.json(popularItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching popular items" });
  }
};

// Get all items by category
const getItemsByCategory = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const items = await prisma.menuItem.findMany({
      where: { category: { name: categoryName } },
      include: { category: true }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items by category" });
  }
};

// Add new menu item
const addMenuItems = async (req, res) => {
    try {
        const {name, price, description, image, categoryName, isPopular} = req.body;
        // Find or create category
        let category = await prisma.category.findUnique({
            where: { name: categoryName }
            });
            if (!category) return res.status(400).json({ message: "Category does not exist" });
    // Create new item
    const newItem = await prisma.menuItem.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        image,
        isPopular: Boolean(isPopular), 
        categoryId: category.id,
      },
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Error adding item" });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const name = req.params.name;
    const id = (await prisma.menuItem.findUnique({
        where: { name }
    })).id;
    const updated = await prisma.menuItem.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating item" });
  }
};

//Delete menu item
const deleteMenuItem = async (req, res) => {
    try{
        const name = req.params.name;
        const id = (await prisma.menuItem.findUnique({
        where: { name }
    })).id;
        await prisma.menuItem.delete({
            where: { id },
        });
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting item" });
    }
};

// Change popularity status
const updateMenuItemPopularity = async (req, res) => {
    try {
        const name = req.params.name;
        const id = (await prisma.menuItem.findFirst({
            where: { name }
        })).id;
        const updated = await prisma.menuItem.update({
            where: { id },
            data: { isPopular: req.body.isPopular }
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Error updating item popularity" });
    }
};

const createCategoryIfNotExists = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name required" });

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding category" });
  }
};


const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};

module.exports = {
    getMenuItems,
    getPopularItems,
    getItemsByCategory,
    addMenuItems,
    updateMenuItem,
    deleteMenuItem,
    updateMenuItemPopularity,
    createCategoryIfNotExists,
    getCategories
};