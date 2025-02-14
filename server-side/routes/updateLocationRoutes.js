const express = require("express");
const {
  updateShipmentLocation,
} = require("../controllers/updateLocationController.js");

const router = express.Router();

router.put("/update-location", updateShipmentLocation);

module.exports = router;
