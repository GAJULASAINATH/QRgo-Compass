const Shipment = require("../models/Shipment");
const { generateQRCodesForShipment } = require("../utils/qrGenerator");

// CREATE Shipment
exports.createShipment = async (req, res) => {
  try {
    console.log("Received request to create shipment:", req.body);

    const { containerId, route, numCheckpoints } = req.body;
    if (!containerId || !numCheckpoints) {
      return res
        .status(400)
        .json({ error: "containerId and numCheckpoints are required" });
    }

    // Generate a unique shipment ID
    const shipmentId = `SHIP-${Date.now()}`;

    // Create an empty shipment first
    const newShipment = new Shipment({
      shipmentId,
      containerId,
      route,
      status: "In Transit",
      checkpoints: [], // Initially empty
    });

    console.log("Saving shipment to DB...");
    await newShipment.save();
    console.log("Shipment saved:", newShipment);

    console.log("Generating QR codes...");
    const qrCodes = await generateQRCodesForShipment(
      shipmentId,
      numCheckpoints
    );

    // Log the generated QR codes to debug
    console.log("Generated QR codes:", qrCodes);

    if (!qrCodes || qrCodes.length === 0) {
      return res.status(500).json({ error: "QR code generation failed" });
    }

    // Update shipment with checkpoints
    newShipment.checkpoints = qrCodes.map((qr, index) => ({
      checkpointId: qr.checkpointId || `CP-${shipmentId}-${index + 1}`,
      checkpointName: `Checkpoint ${index + 1}`,
      latitude: null,
      longitude: null,
      isScanned: false,
      scannedAt: null,
      qrCodeURL: qr.qrCodeURL || "https://fallback-url.com/default_qr.png", // Fallback if missing
    }));

    console.log("Updating shipment with checkpoints...");
    await newShipment.save();
    console.log("Final Shipment Data:", newShipment);

    res.status(201).json(newShipment);
  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ error: error.message });
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
    res.status(200).json({
      message: "Shipment retrieved successfully",
      shipment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LOCATION API
exports.updateShipmentLocation = async (req, res) => {
  console.log("updateshipmentLocation api called bro!!!");
  try {
    const { shipmentId, checkpointId, latitude, longitude } = req.body;
    console.log("Received shipmentId:", shipmentId);

    if (!shipmentId || !checkpointId || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    // Update current location
    shipment.currentLocation = {
      latitude,
      longitude,
    };

    // Add checkpoint to shipment history
    shipment.checkpoints.push({
      checkpointId,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    await shipment.save();

    return res
      .status(200)
      .json({ message: "Location updated successfully", shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE Shipment error location
exports.updateShipment = async (req, res) => {
  console.log("updateshipmentLocation api called bro louda!!!");
  try {
    const updatedShipment = await Shipment.findOneAndUpdate(
      { shipmentId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found!" }); // error detected
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
