import Datastore from "nedb";

const cart = new Datastore({ filename: "./data/cart.json" });
cart.loadDatabase((err) => console.log(err));

export function allProductsInCart(callback) {
  cart.find({}, (err, productsInCart) => {
    callback(productsInCart);
  });
}

export function deleteProductInCart(id) {
  cart.remove({ _id: id });
}

export default cart;
