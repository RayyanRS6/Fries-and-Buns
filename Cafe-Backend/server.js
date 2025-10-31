const express = require("express");
const cors = require("cors");
const popularRoutes = require('./routes/popularRoutes');


const app = express();

app.use(cors());    
app.use(express.json());

app.use('/', popularRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

app.get("/api/deals", (req, res) => {

    const deals=[

        {id:1, name:"Deal : 1", price:750},
        {id:2, name:"Deal : 2", price:1250},
        {id:3, name:"Deal : 3", price:1770},
        {id:1, name:"Deal : 1", price:750},
        {id:2, name:"Deal : 2", price:1250},
        {id:3, name:"Deal : 3", price:1770},
        {id:1, name:"Deal : 1", price:750},
        {id:2, name:"Deal : 2", price:1250},
        {id:3, name:"Deal : 3", price:1770},
    ];

    res.json(deals);
});

app.post("/api/order", (req, res) => {

    orderData = req.body;

    console.log("New Order Recevied", orderData);

    res.json({ msj:"Order Has Been Recevied", order:orderData});
});





app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});


