const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// Place an order
router.post('/:userId', async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = new Order({ userId: req.params.userId, items, totalAmount });
  await order.save();
  res.json(order);
});

router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;
