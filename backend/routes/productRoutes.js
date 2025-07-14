import { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, rateProduct, getUserRatedProducts, allUserRatings, filterProduct } from "../controllers/productController.js";
import userAuth from "../middlewares/userAuth.js"
import express from "express";
const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/all", getAllProducts);
productRouter.post("/single", getSingleProduct);
productRouter.post("/delete", deleteProduct);
productRouter.post("/update", updateProduct);
productRouter.post("/rate",userAuth, rateProduct);
productRouter.get("/userRatedProducts",userAuth, getUserRatedProducts);
productRouter.get("/allUserRatings", allUserRatings);
productRouter.post("/filter", filterProduct);

export default productRouter;