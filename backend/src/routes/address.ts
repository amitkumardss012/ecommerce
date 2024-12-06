import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddressOfUser,
  updateAddress,
} from "../controllers/address";
import { isAuthenticated } from "../middlewares/admin.auth";

const addressRoute = Router();

addressRoute.post("/create", isAuthenticated, createAddress);
addressRoute
  .route("/:id")
  .put(isAuthenticated, updateAddress)
  .delete(isAuthenticated, deleteAddress);

addressRoute.get("/user/:userId", isAuthenticated, getAllAddressOfUser);

export default addressRoute;
