const connection = require("../config/db");
const { promisify } = require("util");

// Promisify the query function
const query = promisify(connection.query).bind(connection);

const OrderModel = {
  getAllOrders: async () => {
    try {
      const results = await query(`
      SELECT 
        Orders.order_id, 
        Orders.customer_id, 
        Customers.name AS customer_name, 
        Orders.product_id, 
        Orders.quantity, 
        Orders.total_amount, 
        Orders.status, 
        Orders.order_date, 
        Orders.shipment_date, 
        Orders.estimated_arrival, 
        Products.name AS product_name 
      FROM Orders 
      JOIN Products ON Orders.product_id = Products.id
      JOIN Customers ON Orders.customer_id = Customers.customer_id
    `);
      return results;
    } catch (err) {
      throw err;
    }
  },
  createOrder: async (order) => {
    const {
      customer_id,
      product_id,
      quantity,
      status,
      shipment_date,
      estimated_arrival,
    } = order;

    try {
      // Start a transaction
      await query("START TRANSACTION");

      // Get the product details
      const productResults = await query(
        "SELECT * FROM products WHERE id = ?",
        [product_id]
      );
      const product = productResults[0];

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.quantity < quantity) {
        throw new Error("Insufficient product quantity");
      }

      // Calculate total amount
      const total_amount = product.price * quantity;

      // Create the order
      const orderResult = await query(
        "INSERT INTO Orders (customer_id, product_id, order_date, status, total_amount, quantity, shipment_date, estimated_arrival) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)",
        [
          customer_id,
          product_id,
          status,
          total_amount,
          quantity,
          shipment_date,
          estimated_arrival,
        ]
      );

      // Update product quantity
      await query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [
        quantity,
        product_id,
      ]);

      // Commit the transaction
      await query("COMMIT");

      return orderResult;
    } catch (err) {
      // Rollback the transaction in case of error
      await query("ROLLBACK");
      throw err;
    }
  },

  updateOrder: async (id, order) => {
    try {
      const results = await query("UPDATE Orders SET ? WHERE order_id = ?", [
        order,
        id,
      ]);
      return results;
    } catch (err) {
      throw err;
    }
  },

  deleteOrder: async (id) => {
    try {
      const results = await query("DELETE FROM Orders WHERE order_id = ?", [
        id,
      ]);
      return results;
    } catch (err) {
      throw err;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const results = await query(
        "UPDATE Orders SET status = ? WHERE order_id = ?",
        [status, id]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  getOrderById: async (id) => {
    try {
      const results = await query(
        `
      SELECT 
        Orders.order_id, 
        Orders.customer_id, 
        Customers.name AS customer_name, 
        Orders.product_id, 
        Orders.quantity, 
        Orders.total_amount, 
        Orders.status, 
        Orders.order_date, 
        Orders.shipment_date, 
        Orders.estimated_arrival, 
        Products.name AS product_name 
      FROM Orders 
      JOIN Products ON Orders.product_id = Products.id
      JOIN Customers ON Orders.customer_id = Customers.customer_id
      WHERE Orders.order_id = ?
    `,
        [id]
      );
      return results[0];
    } catch (err) {
      throw err;
    }
  },
};

module.exports = OrderModel;
