const mongoose = require("mongoose");

const adminDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: "adminDB",
});

const marinerDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: "marinerDB",
});

const shipmentDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: "shipmentDB",
});

module.exports = { adminDB, marinerDB, shipmentDB };
