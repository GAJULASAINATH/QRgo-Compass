const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Routes connected to controller functions
router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);

module.exports = router;
