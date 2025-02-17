const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "We're up!!!" });
});

// Import routes
const productRoutes = require("./routes/products");

// Use routes
app.use("/api/products", productRoutes);

// DB Connection
mongoose
  .connect(DB_URI)
  .then(() => {
    // Start server on successful connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
