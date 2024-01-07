import Datastore from "nedb";
import cart, { deleteAllProductsInCart } from "./addToCart.service.js";

const buy = new Datastore({ filename: "./data/buy.json" });
buy.loadDatabase((err) => console.log(err));

export function AllBoughtProducts(callback) {
  buy.find({}, (err, BoughtProducts) => {
    callback(BoughtProducts);
  });
}

export default buy;
