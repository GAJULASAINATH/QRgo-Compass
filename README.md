📦 QRgo Compass - Cargo Shipment Tracker  
🚢 **Track, Manage & Secure Shipments** in Real-Time using **QR Codes, Node.js, Express, MongoDB & React**  

---
📌 Features  
✅ **Admin Portal** - Manage shipments, oversee operations  
✅ **Driver Portal** - Update shipment locations via API calls  
✅ **Mariners Portal** - Separate portal for shipment management  
✅ **QR Code Integration** - Scan at checkpoints for real-time updates  
✅ **Shipment Tracking API** - Get live shipment details & ETA  
✅ **Authentication & Authorization** - Secure access for Admins & Mariners  

---

🚀 Tech Stack  
🔹 **Backend:** Node.js, Express.js, MongoDB  
🔹 **Frontend:** React, Redux (Upcoming)  
🔹 **Auth:** JWT (JSON Web Tokens)  
🔹 **QR Code Generation:** qrcode package  
🔹 **Database:** MongoDB (Admin & Mariners have separate DBs)  

---

🛠️ Setup Instructions  

📥 1. Clone the Repository  
```sh
git clone https://github.com/yourusername/QRgo-Compass.git
cd QRgo-Compass/server-side
```

📌 2. Install Dependencies  
```sh
npm install
```

🔑 3. Setup Environment Variables  
Create a `.env` file inside `server-side/` and add:  
```sh
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

📡 4. Run the Server  
```sh
npm start
```
OR (if using nodemon for auto-restarts)  
```sh
npm run dev
```
🚀 Server will start at **http://localhost:3000/**  

---

📡 API Endpoints  

🛑 Auth (Admins & Mariners)  
🔹 **Admin Login** - `POST /api/admins/login`  
🔹 **Mariner Login** - `POST /api/mariners/login`  

🚚 Shipments API 
🔹 **Get All Shipments** - `GET /api/shipments`  
🔹 **Add New Shipment** - `POST /api/shipments`  
🔹 **Update Shipment Location** - `PATCH /api/update-location/:id`  
🔹 **Get ETA of Shipment** - `GET /api/shipments/:id/eta`  

---

📜 Folder Structure  
```
QRgo-Compass/
│── server-side/
│   ├── controllers/        # API logic (Shipments, Mariners, Admins)
│   ├── dbConnections/      # MongoDB connection logic
│   ├── middlewares/        # JWT authentication middleware
│   ├── models/             # Mongoose models (Admin, Mariner, Shipment)
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (QR Code Generator)
│   ├── public/qrcodes/     # Generated QR codes stored here
│   ├── app.js              # Main server file
│   ├── package.json        # Dependencies and scripts
│   ├── .env                # Environment variables
```

---
🎯 Upcoming Features  
🔜 **Frontend (React + Redux)** - Admin Dashboard, Map Integration  
🔜 **Live Shipment Tracking** - Real-time updates on the map  
🔜 **Customer Portal** - For customers to track shipments  
🔜 **Dockerized Setup** - Easy deployment  

---

🛠 Contributors  
👨‍💻 [Gajula Sainath] - Backend Developer  

🚀 **Pull Requests are Welcome!** 🎉  
