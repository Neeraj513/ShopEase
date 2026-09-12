const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity)
      });
    }

    await cart.save();

    cart = await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.quantity = Number(quantity);

    if (item.quantity <= 0) {
      item.deleteOne();
    }

    await cart.save();

    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    });

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.deleteOne();

    await cart.save();

    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
};