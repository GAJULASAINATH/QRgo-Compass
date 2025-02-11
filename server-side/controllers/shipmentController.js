// Controller functions for shipment

// Get all shipment
const getAllShipment = (req, res) => {
  res.send("Fetching all shipment...");
};

// Create a new shipment
const createShipment = (req, res) => {
  res.send("Creating a new shipment...");
};

// Update an shipment
const updateShipment = (req, res) => {
  res.send(`Updating shipment with ID: ${req.params.id}`);
};

// Delete an shipment
const deleteShipment = (req, res) => {
  res.send(`Deleting shipment with ID: ${req.params.id}`);
};

// Export the functions
module.exports = {
  getAllShipment,
  createShipment,
  updateShipment,
  deleteShipment,
};
