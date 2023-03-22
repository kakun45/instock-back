require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const warehousesRoutes = require("./routes/warehousesRoute");
const inventoriesRoutes = require("./routes/inventoriesRoute");

app.use(express.json()); // for accessing

// all warehouses/inventories routes
app.use("/api/warehouses", warehousesRoutes);
app.use("/api/inventories", inventoriesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 unning on Port: ${PORT}`);
});
