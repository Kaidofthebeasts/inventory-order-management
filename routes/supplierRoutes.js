const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Route to get all suppliers
router.get('/suppliers', supplierController.fetchAllSuppliers);

// Route to get a single supplier by ID
router.get('/suppliers/:id', supplierController.fetchSupplierById);

// Route to create a new supplier
router.post('/suppliers', supplierController.addNewSupplier);

// Route to update a supplier
router.put('/suppliers/:id', supplierController.modifySupplier);

// Route to delete a supplier
router.delete('/suppliers/:id', supplierController.removeSupplier);

module.exports = router;
