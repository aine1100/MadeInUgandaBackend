const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');

// Get cart items
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

// Add to cart
router.post('/:userId', async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    cart = new Cart({ userId: req.params.userId, items: [] });
  }
  cart.items.push({ productId, quantity });
  await cart.save();
  res.json(cart);
});

// Update cart item
router.put('/:userId/:productId', async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.params.userId, 'items.productId': req.params.productId },
    { $set: { 'items.$.quantity': quantity } },
    { new: true }
  );
  res.json(cart);
});

// Remove from cart
router.delete('/:userId/:productId', async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.params.userId },
    { $pull: { items: { productId: req.params.productId } } },
    { new: true }
  );
  res.json(cart);
});

module.exports = router;
