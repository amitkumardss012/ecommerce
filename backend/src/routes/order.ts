import { Router } from "express";
import { createOrder, getAllOrders, getOrderbyId, getOrdersOfUser } from "../controllers/order";
import { isAdmin, isAuthenticated } from "../middlewares/admin.auth";

const orderRoute = Router();

orderRoute.post("/create", isAuthenticated, createOrder)
orderRoute.get("/all", isAuthenticated, isAdmin, getAllOrders)

orderRoute.route("/user/:userId").get(isAuthenticated, getOrdersOfUser);
orderRoute.route("/:orderId").get(isAuthenticated, getOrderbyId);

export default orderRoute;