const express = require("express");
const cors = require("cors");
const menuRoutes = require('./routes/menuRoutes');

const app = express();

app.use(cors());    
app.use(express.json());


app.use('/api', menuRoutes);


app.post("/api/order", (req, res) => {
    orderData = req.body;
    console.log("New Order Recevied", orderData);
    res.json({ msj:"Order Has Been Recevied", order:orderData});
});


app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});


