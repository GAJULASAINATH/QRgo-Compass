//All packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//rotutes
const { connectDB } = require("./dbConnections/db");
const adminRoutes = require("./routes/adminRoutes");
const marinerRoutes = require("./routes/marinerRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const updateLocationRoutes = require("./routes/updateLocationRoutes");
const jwtAuthenticator = require("./middlewares/jwtAuthenticator");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const serverAndDatabaseConnection = async () => {
  try {
    await connectDB();

    //UNPROTEDTED ROUTES
    app.use("/api/admins", adminRoutes);
    app.use("/api/mariners", marinerRoutes);

    //PROTECTED ROUTES
    app.use("/api/shipments", jwtAuthenticator, shipmentRoutes);
    app.use("/api/update-location", jwtAuthenticator, updateLocationRoutes);

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
