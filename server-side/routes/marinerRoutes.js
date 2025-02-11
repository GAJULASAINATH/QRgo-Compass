const express = require("express");
const router = express.Router();
const marinerController = require("../controllers/marinerController");

// Routes connected to controller functions
router.post("/signup", marinerController.marinerSignup);
router.post("/login", marinerController.marinerLogin);

module.exports = router;
