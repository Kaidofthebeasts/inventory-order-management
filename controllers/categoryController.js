const CategoryModel = require('../models/categoryModel');

const fetchAllCategories = async (req, res) => {
  try {
    const results = await CategoryModel.getAllCategories();
    res.json(results);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Error fetching categories');
  }
};

const fetchCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await CategoryModel.getCategoryById(categoryId);
    res.json(result);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).send('Error fetching category');
  }
};

const addNewCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    await CategoryModel.createCategory(newCategory);
    res.status(201).send('Category created successfully');
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).send('Error creating category');
  }
};

const modifyCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    await CategoryModel.updateCategory(categoryId, updatedCategory);
    res.send('Category updated successfully');
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).send('Error updating category');
  }
};

const removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await CategoryModel.deleteCategory(categoryId);
    res.send('Category deleted successfully');
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).send('Error deleting category');
  }
};

module.exports = {
  fetchAllCategories,
  fetchCategoryById,
  addNewCategory,
  modifyCategory,
  removeCategory
};
