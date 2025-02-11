const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  containerId: { type: String, required: true },
  route: { type: String, required: true },
  currentLocation: { type: String },
  ETA: { type: Date },
  status: { type: String, enum: ['In Transit', 'Delivered', 'Delayed'], default: 'In Transit' },
  qrScanHistory: [
    {
      scannedAt: { type: Date, default: Date.now },
      location: String,
      scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Mariner' }
    }
  ]
});

module.exports = mongoose.model('Shipment', shipmentSchema);
