const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Route to get all products
router.get("/products", inventoryController.fetchAllProducts);

// Route to get a single product by ID
router.get("/products/:id", inventoryController.fetchProductById);

// Route to create a new product
router.post("/products", inventoryController.addNewProduct);

// Route to update a product
router.put("/products/:id", inventoryController.modifyProduct);

// Route to delete a product
router.delete("/products/:id", inventoryController.removeProduct);

module.exports = router;
