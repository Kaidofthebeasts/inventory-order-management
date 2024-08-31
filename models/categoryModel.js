const connection = require('../config/db');

const CategoryModel = {
  getAllCategories: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM categories', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  },

  createCategory: (category) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO categories SET ?', category, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  updateCategory: (id, category) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE categories SET ? WHERE id = ?', [category, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

module.exports = CategoryModel;
