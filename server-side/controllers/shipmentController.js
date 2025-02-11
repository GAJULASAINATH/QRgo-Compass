const Shipment = require("../models/Shipment");

// CREATE Shipment
exports.createShipment = async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json({
      message: "Shipment created successfully!",
      shipment: newShipment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Shipment by ID
exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ shipmentId: req.params.id });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found!" });
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Shipment
exports.updateShipment = async (req, res) => {
  try {
    const updatedShipment = await Shipment.findOneAndUpdate(
      { shipmentId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found!" });
    }
    res.status(200).json({
      message: "Shipment updated successfully!",
      shipment: updatedShipment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Shipment
exports.deleteShipment = async (req, res) => {
  try {
    const deletedShipment = await Shipment.findOneAndDelete({
      shipmentId: req.params.id,
    });
    if (!deletedShipment) {
      return res.status(404).json({ message: "Shipment not found!" });
    }
    res.status(200).json({ message: "Shipment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
