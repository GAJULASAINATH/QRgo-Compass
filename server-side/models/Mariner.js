const mongoose = require("mongoose");
const { marinerDB } = require("../dbConnections/db");

const marinerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "mariner" },
  },
  { timestamps: true }
);

module.exports = marinerDB.model("Mariner", marinerSchema);
