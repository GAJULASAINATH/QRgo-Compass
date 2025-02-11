const mongoose = require("mongoose");

const adminDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: "adminDB",
});

const marinerDB = mongoose.createConnection(process.env.MONGO_URI, {
  dbName: "marinerDB",
});

module.exports = { adminDB, marinerDB };
