import { Router } from "express";
import { AllBoughtProducts, BuyProductsWithAOA } from "../services/buy.service.js";

const Buy = Router();
const _buy = [];

Buy.get("/buy", (req, res) => {
  AllBoughtProducts((BoughtProducts) => {
    res.json(BoughtProducts);
  });
});

Buy.post("/buy", (req, res) => {
  const { name, surname, phone, address, comment } = req.body;
  BuyProductsWithAOA(name, surname, phone, address, comment)
  res.json({message: "you successfully bought products"})
});

export default Buy;
