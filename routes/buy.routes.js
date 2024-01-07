import { Router } from "express";
import buy, { AllBoughtProducts } from "../services/buy.service.js";
import cart, {
  deleteProductInCartByUsername,
} from "../services/addToCart.service.js";

const Buy = Router();
const _buy = [];

Buy.get("/buy", (req, res) => {
  AllBoughtProducts((BoughtProducts) => {
    res.json(BoughtProducts);
  });
});

Buy.post("/buy/:username", (req, res) => {
  const username = req.params.username;
  const { name, surname, phone, address, comment } = req.body;
  const doc = {
    name,
    surname,
    phone,
    address,
    comment,
  };

  cart.find({ username }, (err, document) => {
    if (err) {
      console.log(err);
    } else {
      if (document) {
        buy.insert([[doc, document]], (err, newDocs) => {
          console.log("successfully bought products", newDocs);
        });
        deleteProductInCartByUsername(req.params.username);
      }
    }
  });
  res.json({ message: "you successfully bought products" });
});

export default Buy;
