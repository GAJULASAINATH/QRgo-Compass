const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

// Routes connected to controller functions
router.get("/", shipmentController.getAllShipment);
router.post("/", shipmentController.createShipment);
router.put("/:id", shipmentController.updateShipment);
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;
