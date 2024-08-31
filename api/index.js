const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const inventoryRoutes = require("../routes/inventoryRoutes"); // Import inventory routes
const supplierRoutes = require("../routes/supplierRoutes"); // Import supplier routes
const categoryRoutes = require("../routes/categoryRoutes"); // Import category routes
const orderRoutes = require("../routes/orderRoutes"); //Import order routes
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Use inventory routes
app.use("/api", inventoryRoutes);

// Use supplier routes
app.use("/api", supplierRoutes);

// Use category routes
app.use("/api", categoryRoutes);
//Use Order routes
app.use("/api", orderRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
