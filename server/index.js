const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

const connectDB = require("./config/db");
const cloudinary = require("./config/cloudinary.js");

const app = express();
const PORT = process.env.PORT || 8000;

// Import Routes

const UserRoutes = require("./routes/RegisterUser");

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(fileupload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/register", UserRoutes);

cloudinary.cloudinaryConnect();

// Server Start
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();
