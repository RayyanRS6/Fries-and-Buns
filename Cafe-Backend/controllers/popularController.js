const getPopularItems = (req, res) => {
    const popularItems = [
        { id: 1, name: "Crispy Zinger Burger", price: 650 },
        { id: 2, name: "Cheesy Fries", price: 400 },
        { id: 3, name: "BBQ Pizza Slice", price: 500 },
        { id: 1, name: "Crispy Zinger Burger", price: 650 },
        { id: 2, name: "Cheesy Fries", price: 400 },
        { id: 3, name: "BBQ Pizza Slice", price: 500 },
    ];
    res.json(popularItems);
};

module.exports = { getPopularItems };   