const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/', removeFromCart);

module.exports = router; 