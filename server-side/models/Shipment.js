const mongoose = require("mongoose");
const { shipmentDB } = require("../dbConnections/db");

const ShipmentSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
    unique: true,
  },
  containerId: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  ETA: {
    type: String,
  },
  status: {
    type: String,
    enum: ["In Transit", "Delivered", "Pending"],
    default: "In Transit",
  },
  checkpoints: [
    {
      checkpointId: { type: String, required: true },
      latitude: Number,
      longitude: Number,
      timestamp: { type: Date, default: Date.now },
      qrCodeURL: { type: String, required: true },
    },
  ],
});

module.exports = shipmentDB.model("Shipment", ShipmentSchema);
