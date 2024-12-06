import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getBrandNamesByCategory,
  getLatestProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product";
import upload from "../helpers/multer";
import { isAdmin, isAuthenticated } from "../middlewares/admin.auth";

const productRoute = Router();

productRoute.post(
  "/create",
  upload.array("images", 10),
  isAuthenticated,
  isAdmin,
  createProduct
);

productRoute
  .route("/:id")
  .put(isAuthenticated, isAdmin, upload.array("images", 10), updateProduct) // Upload middleware only for PUT
  .delete(isAuthenticated, isAdmin, deleteProduct)
  .get(isAuthenticated, getSingleProduct);

productRoute.get("/latest", isAuthenticated, getLatestProduct);
productRoute.get("/all", isAuthenticated, getAllProducts);
productRoute.get("/category", isAuthenticated, getAllCategories);
productRoute.get(
  "/brandName/:category",
  isAuthenticated,
  getBrandNamesByCategory
);

export default productRoute;
