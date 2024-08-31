const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/orders', orderController.fetchAllOrders);

// Route to get a single order by ID
router.get('/orders/:id', orderController.fetchOrderById);

// Route to create a new order
router.post('/orders', orderController.addNewOrder);

// Route to update an order
router.put('/orders/:id', orderController.modifyOrder);

// Route to delete an order
router.delete('/orders/:id', orderController.removeOrder);

module.exports = router;
