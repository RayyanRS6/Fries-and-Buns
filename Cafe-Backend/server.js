const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/cafe")
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});


const menuRoutes = require('./routes/menuRoutes');

const app = express();

app.use(cors());    
app.use(express.json());


app.use('/api/menu', menuRoutes);


app.post("/api/order", (req, res) => {

    orderData = req.body;

    console.log("New Order Recevied", orderData);

    res.json({ msj:"Order Has Been Recevied", order:orderData});
});


app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});


