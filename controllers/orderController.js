const OrderModel = require("../models/orderModel");

const fetchAllOrders = async (req, res) => {
  try {
    const results = await OrderModel.getAllOrders();
    res.json(results);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Error fetching orders");
  }
};

const fetchOrderById = async (req, res) => {
  try {
    const order = await OrderModel.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

const addNewOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    await OrderModel.createOrder(newOrder);
    res.status(201).send("Order created successfully");
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Error creating order");
  }
};

const modifyOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = req.body;
    await OrderModel.updateOrder(orderId, updatedOrder);
    res.send("Order updated successfully");
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).send("Error updating order");
  }
};

const removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await OrderModel.deleteOrder(orderId);
    res.send("Order deleted successfully");
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send("Error deleting order");
  }
};

module.exports = {
  fetchAllOrders,
  fetchOrderById,
  addNewOrder,
  modifyOrder,
  removeOrder,
};
