const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQRCodesForShipment = async (shipmentId, numCheckpoints) => {
  const qrCodes = [];
  const outputDir = path.join(__dirname, "../public/qrcodes"); // Save in `public/qrcodes/`

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create if not exists
  }

  for (let i = 0; i < numCheckpoints; i++) {
    const checkpointId = `CP-${shipmentId}-${i + 1}`;
    const qrData = { shipmentId, checkpointId };

    // Generate Base64 QR Code
    const qrCodeURL = await QRCode.toDataURL(JSON.stringify(qrData));

    // Save QR Code as PNG Image
    const qrCodeImagePath = path.join(outputDir, `${checkpointId}.png`);
    await QRCode.toFile(qrCodeImagePath, JSON.stringify(qrData));

    qrCodes.push({ checkpointId, qrCodeURL, qrCodeImagePath });
  }

  return qrCodes; // Return array with base64 and file paths
};

module.exports = { generateQRCodesForShipment };
