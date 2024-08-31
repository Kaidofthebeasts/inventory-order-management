const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to get all categories
router.get('/categories', categoryController.fetchAllCategories);

// Route to get a single category by ID
router.get('/categories/:id', categoryController.fetchCategoryById);

// Route to create a new category
router.post('/categories', categoryController.addNewCategory);

// Route to update a category
router.put('/categories/:id', categoryController.modifyCategory);

// Route to delete a category
router.delete('/categories/:id', categoryController.removeCategory);

module.exports = router;
