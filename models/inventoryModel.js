const connection = require("../config/db");

const InventoryModel = {
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM products", (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results[0]);
        }
      );
    });
  },

  createProduct: (product) => {
    return new Promise((resolve, reject) => {
      console.log("Product to be inserted:", product); // Log the product object
      connection.query(
        "INSERT INTO products SET ?",
        product,
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },

  updateProduct: (id, product) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET ? WHERE id = ?",
        [product, id],
        (err, results) => {
          if (err) {
            console.error("Database error:", err); // Log the detailed error
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },

  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },
};

module.exports = InventoryModel;
