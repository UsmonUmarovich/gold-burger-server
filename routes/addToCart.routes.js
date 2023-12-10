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

  products.findOne({ _id: id }, (err, document) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (document) {
        cart.insert(document, (err, newDocument) => {
          res.json(document);
        });
      }
    }
  });
});

addToCartRoutes.delete("/cart/:id", (req, res) => {
  deleteProductInCart(req.params.id);
  res.json({ message: "product deleted on cart" });
});

addToCartRoutes.delete("/cart", (req, res) => {
  deleteAllProductsInCart()
  res.json({message: "all products in cart were deleted"})
});

export default addToCartRoutes;
