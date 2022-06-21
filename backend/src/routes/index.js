const express = require("express");
const app = express();

const itemRoutes = require("../routes/item.routes");
const billRoutes = require("../routes/bill.routes");

app.use("/item", itemRoutes);
app.use("/bill", billRoutes);

module.exports = app;
