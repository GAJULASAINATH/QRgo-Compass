const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfully!!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const adminDB = mongoose.connection.useDb("adminDB");
const marinerDB = mongoose.connection.useDb("marinerDB");
const shipmentDB = mongoose.connection.useDb("shipmentDB");

module.exports = { connectDB, adminDB, marinerDB, shipmentDB };
