import Datastore from "nedb";
import cart, { deleteAllProductsInCart } from "./addToCart.service.js";

const buy = new Datastore({ filename: "./data/buy.json" });
buy.loadDatabase((err) => console.log(err));

export function AllBoughtProducts(callback) {
  buy.find({}, (err, BoughtProducts) => {
    callback(BoughtProducts);
  });
}

export function BuyProductsWithAOA(name, surname, phone, address, comment) {
  const doc = {
    name,
    surname,
    phone,
    address,
    comment,
  };

  cart.find({}, (err, document) => {
    if (err) {
      console.log(err);
    } else {
      if (document) {
        buy.insert([doc, document], (err, newDocs) => {
          console.log("successfully bought products", newDocs);
        })
        deleteAllProductsInCart()
      }
    }
  });
}

export default buy;
