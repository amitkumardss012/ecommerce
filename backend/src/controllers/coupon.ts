import { Request } from "express";
import { asyncHandler } from "../middlewares/error";
import Coupon from "../models/coupon";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";

export const creatCoupon = asyncHandler(async (req, res, next) => {
  const { code, discount } = req.body;

  if (!code) {
    return next(
      new ErrorHandler("coupon code is required", statusCode.Bad_Request)
    );
  }

  const existingCoupon = await Coupon.findOne({ code });
  if (existingCoupon) {
    return next(new ErrorHandler("coupon already exists", statusCode.Conflict));
  }

  if (discount < 0) {
    return next(
      new ErrorHandler(
        "coupon discount should be a positive number",
        statusCode.Bad_Request
      )
    );
  }

  const newCoupon = await Coupon.create({
    code,
    discount,
  });

  return res.status(statusCode.Created).json({
    success: true,
    message: "coupon created successfully",
    data: newCoupon,
  });
});

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const { code, discount } = req.body;
  const { id } = req.params;
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return next(new ErrorHandler("coupon not found", statusCode.Not_Found));
  }

  coupon.code = code;
  coupon.discount = discount;
  const updatedCoupon = await coupon.save();
  return res.status(statusCode.OK).json({
    success: true,
    message: "coupon updated successfully",
    data: updatedCoupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return next(new ErrorHandler("coupon not found", statusCode.Not_Found));
  }
  await coupon.deleteOne();
  return res.status(statusCode.OK).json({
    success: true,
    message: "coupon deleted successfully",
  });
});

export const applyCoupon = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return next(new ErrorHandler("coupon not found", statusCode.Not_Found));
  }

  return res.status(statusCode.OK).json({
    success: true,
    message: "coupon applied successfully",
    discount: coupon.discount,
  });
});

export const getCouponById = asyncHandler(
  async (req: Request<{ id: string }>, res, next) => {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return next(new ErrorHandler("coupon not found", statusCode.Not_Found));
    }
    return res.status(statusCode.OK).json({
      success: true,
      message: "coupon fetched successfully",
      coupon,
    });
  }
);

export const getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find();
  return res.status(statusCode.OK).json({
    success: true,
    message: "coupons fetched successfully",
    coupons: coupons,
  });
});
