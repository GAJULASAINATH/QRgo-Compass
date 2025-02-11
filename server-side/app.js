//All packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//rotutes
const adminRoutes = require("./routes/adminRoutes");
const marinerRoutes = require("./routes/marinerRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const serverAndDatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "adminDB",
    });

    console.log("Database connected Successfully!!");

    app.use("/api/admins", adminRoutes);
    app.use("/api/mariners", marinerRoutes);
    app.use("/api/shipments", shipmentRoutes);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  } finally {
    console.log("Server initialization attempted.");
  }
};

serverAndDatabaseConnection();
