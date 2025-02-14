const Shipment = require("../models/Shipment");

exports.updateShipmentLocation = async (req, res) => {
  console.log("updateShipmentLocation API called bro!!!");
  console.log("Received request body:", req.body); // 🔍 Log the full body

  try {
    const { shipmentId, checkpointId, latitude, longitude, qrCodeURL } =
      req.body;
    console.log("Extracted:", {
      shipmentId,
      checkpointId,
      latitude,
      longitude,
      qrCodeURL,
    }); // ✅ Log extracted data

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
      qrCodeURL, // ✅ Ensure it's received
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
