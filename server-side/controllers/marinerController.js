// REQUIREMENTS FOR CURRENT MODULE
require("dotenv").config();
const Mariner = require("../models/Mariner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MARINER SIGNUP API
exports.marinerSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required!" });
    }

    const existingMariner = await Mariner.findOne({ email });
    if (existingMariner) {
      return res.status(400).json({ message: "Mariner already exists!" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTROUNDS)
    );
    const newMariner = new Mariner({
      name,
      email,
      password: hashedPassword,
      role: role || "mariner",
    });

    await newMariner.save();
    res.status(201).json({ message: "Mariner registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARINER LOGIN API
exports.marinerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password required!" });
    }

    const mariner = await Mariner.findOne({ email });
    if (!mariner) {
      return res.status(404).json({ message: "Mariner not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, mariner.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { marinerId: mariner._id, role: "mariner" },
      process.env.JWT_SECRET_TOKEN
    );

    res.status(200).json({ message: "Login successful!", jwtToken: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
