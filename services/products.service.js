import Datastore from "nedb";

const products = new Datastore({ filename: "./data/products.json" });
products.loadDatabase((err) => console.log(err));

export function allProducts(callback) {
  products.find({}, (err, product) => {
    callback(product);
  });
}

export function createProduct(img, title, desc, price) {
  const doc = {
    img,
    title,
    desc,
    price,
  };
    products.insert(doc, (err, newDoc) => {
      console.log(err);
    });
}

export function deleteProduct(id) {
  products.remove({ _id: id });
}

export default products