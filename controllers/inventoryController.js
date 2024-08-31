const InventoryModel = require("../models/inventoryModel");

const fetchAllProducts = async (req, res) => {
  try {
    const results = await InventoryModel.getAllProducts();
    res.json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
};

const fetchProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await InventoryModel.getProductById(productId);
    res.json(result);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Error fetching product");
  }
};

const addNewProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    console.log("Request body:", newProduct); // Log the request body
    await InventoryModel.createProduct(newProduct);
    res.status(201).send("Product created successfully");
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Error creating product");
  }
};

const modifyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    await InventoryModel.updateProduct(productId, updatedProduct);
    res.send("Product updated successfully");
  } catch (err) {
    console.error("Error updating product:", err); // Log the detailed error
    res.status(500).send("Error updating product");
  }
};

const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await InventoryModel.deleteProduct(productId);
    res.send("Product deleted successfully");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Error deleting product");
  }
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
  addNewProduct,
  modifyProduct,
  removeProduct,
};
