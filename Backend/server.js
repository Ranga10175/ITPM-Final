const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const cookieParser = require('cookie-parser'); // Add this

const app = express();

// =========================
// CONFIG
// =========================
const PORT = 5000;

// MongoDB Atlas Connection
const MONGO_URI =
  "mongodb://withmalwijesiri:12345ometh@cluster0-shard-00-00.yb9sm.mongodb.net:27017,cluster0-shard-00-01.yb9sm.mongodb.net:27017,cluster0-shard-00-02.yb9sm.mongodb.net:27017/RoomManagement?ssl=true&replicaSet=atlas-xw65gf-shard-0&authSource=admin&appName=Cluster0";

// =========================
// CORS
// =========================
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// =========================
// MIDDLEWARE
// =========================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie parser middleware

// CHANGED: uploads path kept as "Uploads" to match your folder name in Backend
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/Gallery", express.static(path.join(__dirname, "Gallery")));

// =========================
// MONGODB CONNECTION
// =========================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// =========================
// ROUTES
// =========================
const roomdetailsRouter = require("./RoomDetailsForm/routes/roomdetails");
app.use("/roomdetails", roomdetailsRouter);

const roomchangeRouter = require("./Roomchangerequest/routes/roomchange");
app.use("/roomchange", roomchangeRouter);

// CHANGED: added complaint router import + route
const complaintRouter = require("./ComplaintManagement/routes/complaint");
app.use("/api/complaints", complaintRouter);
const leaverequestRouter = require("./LeaveRequest/routes/leaverequests"); 
app.use("/api/leave", leaverequestRouter);
const adminRouter = require("./Admin/router");
app.use("/api/admin", adminRouter);

// Gallery Route
app.get("/api/gallery", (req, res) => {
  const galleryPath = path.join(__dirname, "Gallery");
  console.log(`🔍 Scanning Gallery path: ${galleryPath}`);
  try {
    if (!fs.existsSync(galleryPath)) {
      console.log("📁 Gallery folder not found, creating it.");
      fs.mkdirSync(galleryPath);
    }
    const files = fs.readdirSync(galleryPath);
    console.log(`📄 Found ${files.length} files in Gallery directory.`);
    
    const mediaExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm'];
    const filteredFiles = files.filter(file => 
      mediaExtensions.includes(path.extname(file).toLowerCase())
    );

    const galleryFiles = filteredFiles.map(file => ({
      url: `/Gallery/${file}`,
      name: file,
      type: file.toLowerCase().endsWith(".mp4") ? "video" : "image"
    }));
    
    console.log(`🖼️ Returning ${galleryFiles.length} media items.`);
    res.json({ success: true, files: galleryFiles });
  } catch (err) {
    console.error("❌ Gallery Error:", err);
    res.status(500).json({ success: false, error: "Failed to load gallery" });
  }
});

const loginSignRoutes = require("../Backend/LoginSignup/router");
app.use("/api/auth", loginSignRoutes); // Changed path to avoid conflicts

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// =========================
// ERROR HANDLING
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    details: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);

  // CHANGED: uploads log path updated to "Uploads"
  console.log(`📁 Uploads directory: ${path.join(__dirname, "Uploads")}`);
});

//abc
