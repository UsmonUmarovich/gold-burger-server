import { Router } from "express";
import cart, {
  allProductsInCart,
  deleteAllProductsInCart,
  deleteProductInCart,
} from "../services/addToCart.service.js";
import products from "../services/products.service.js";

const addToCartRoutes = Router();
const _cart = [];

addToCartRoutes.get("/cart", (req, res) => {
  allProductsInCart((productsInCart) => {
    res.json({ message: productsInCart });
  });
});

addToCartRoutes.post("/cart/:id", (req, res) => {
  const id = req.params.id;
  const { _id } = req.params;

  // Create or load the user's cart from the database
  cart.findOne({ _id }, (err, userCart) => {
    products.findOne({ _id: id }, (err, document) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (!userCart) {
        // If the user doesn't have a cart, create a new cart
        const newCart = {
          _id,
          products: [{ document }],
        };

        // Insert the new cart into the database
        cart.insert(newCart, (err, newDoc) => {
          if (err) {
            res.status(500).json({ error: "Failed to create cart" });
            return;
          }
          res
            .status(200)
            .json({ message: "Product added to cart successfully" });
        });
      }
    });
  });
});
// first _id is cart's id. second id is product's id
addToCartRoutes.post("/cart/:_id/:id", (req, res) => {
  const { _id } = req.params;
  const id = req.params.id;

  cart.findOne({ _id }, (err, userCart) => {
    products.findOne({ _id: id }, (err, document) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      // If the user already has a cart, update the cart items
      userCart.products.push({ document });

      // Update the user's cart in the database
      cart.update({ _id }, userCart, {}, (err, numReplaced) => {
        if (err) {
          x;
          res.status(500).json({ error: "Failed to update cart" });
          return;
        }
        res.status(200).json({ message: "Product added to cart successfully" });
      });
    });
  });
});

addToCartRoutes.delete("/cart/:id", (req, res) => {
  deleteProductInCart(req.params.id);
  res.json({ message: "product deleted on cart" });
});

addToCartRoutes.delete("/cart", (req, res) => {
  deleteAllProductsInCart();
  res.json({ message: "all products in cart were deleted" });
});

export default addToCartRoutes;
