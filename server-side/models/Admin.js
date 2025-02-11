const mongoose = require("mongoose");
const { adminDB } = require("../dbConnections/db");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = adminDB.model("Admin", adminSchema);
