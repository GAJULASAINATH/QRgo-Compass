const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

// CREATE a new shipment
router.post("/create", shipmentController.createShipment);

// GET all shipments
router.get("/", shipmentController.getAllShipments);

// GET a specific shipment by ID
router.get("/:id", shipmentController.getShipmentById);

// UPDATE a shipment by ID
router.put("/:id", shipmentController.updateShipment);

// DELETE a shipment by ID
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;
