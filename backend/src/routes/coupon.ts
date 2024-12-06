import { Router } from "express";
import {
  applyCoupon,
  creatCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
} from "../controllers/coupon";
import { isAdmin, isAuthenticated } from "../middlewares/admin.auth";

const couponRouter = Router();

couponRouter.use(isAuthenticated, isAdmin);

couponRouter.post("/create", creatCoupon);

couponRouter.get("/discount", applyCoupon);

couponRouter.get("/all", getAllCoupons);

couponRouter
  .route("/:id")
  .get(getCouponById)
  .put(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
