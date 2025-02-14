const Shipment = require("../models/Shipment");

//UPDATE-LOCATION OF SHIPMENT AT EACH CHECKPOINT (CORE API)
exports.updateShipmentLocation = async (req, res) => {
  try {
    const { shipmentId, checkpointId, latitude, longitude, qrCodeURL } =
      req.body;

    if (!shipmentId || !checkpointId || !latitude || !longitude || !qrCodeURL) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    shipment.currentLocation = { latitude, longitude };

    shipment.checkpoints.push({
      checkpointId,
      latitude,
      longitude,
      timestamp: new Date(),
      qrCodeURL,
    });

    await shipment.save();

    return res
      .status(200)
      .json({ message: "Location updated successfully", shipment });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
