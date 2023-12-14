import { Router } from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
} from "../services/products.service.js";
import products from "../services/products.service.js";

const productsRoutes = Router();
const _products = [];

productsRoutes.get("/products", (req, res) => {
  allProducts((product) => {
    res.json(product);
  });
});

productsRoutes.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  products.update(
    { _id: id },
    document,
    { upsert: true },
    (err, numReplaced, upsert) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (upsert) {
          res.status(201).json({ message: "Product inserted successfully" });
        } else {
          res.json({ message: "Product updated successfully" });
        }
      }
    }
  );
});

productsRoutes.get("/products/:id", (req, res) => {
  const id = req.params.id;

  products.findOne({ _id: id }, (err, document) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (document) {
        res.json(document);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    }
  });
});

productsRoutes.post("/products/add", (req, res) => {
  const { img, title, desc, price } = req.body;
  createProduct(img, title, desc, price);
  res.json({ message: "posted successfully" });
});

productsRoutes.delete("/products/:id", (req, res) => {
  deleteProduct(req.params.id);
  res.json({ message: "product deleted" });
});

export default productsRoutes;
