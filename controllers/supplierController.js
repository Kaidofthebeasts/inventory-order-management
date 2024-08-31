const SupplierModel = require('../models/supplierModel');

const fetchAllSuppliers = async (req, res) => {
  try {
    const results = await SupplierModel.getAllSuppliers();
    res.json(results);
  } catch (err) {
    console.error('Error fetching suppliers:', err);
    res.status(500).send('Error fetching suppliers');
  }
};

const fetchSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const result = await SupplierModel.getSupplierById(supplierId);
    res.json(result);
  } catch (err) {
    console.error('Error fetching supplier:', err);
    res.status(500).send('Error fetching supplier');
  }
};

const addNewSupplier = async (req, res) => {
  try {
    const newSupplier = req.body;
    await SupplierModel.createSupplier(newSupplier);
    res.status(201).send('Supplier created successfully');
  } catch (err) {
    console.error('Error creating supplier:', err);
    res.status(500).send('Error creating supplier');
  }
};

const modifySupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const updatedSupplier = req.body;
    await SupplierModel.updateSupplier(supplierId, updatedSupplier);
    res.send('Supplier updated successfully');
  } catch (err) {
    console.error('Error updating supplier:', err);
    res.status(500).send('Error updating supplier');
  }
};

const removeSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    await SupplierModel.deleteSupplier(supplierId);
    res.send('Supplier deleted successfully');
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).send('Error deleting supplier');
  }
};

module.exports = {
  fetchAllSuppliers,
  fetchSupplierById,
  addNewSupplier,
  modifySupplier,
  removeSupplier
};
