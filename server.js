import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";
import addToCartRoutes from "./routes/addToCart.routes.js";
import Buy from "./routes/Buy.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRoutes)
app.use(addToCartRoutes)
app.use(Buy)

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
