import { asyncHandler } from "../middlewares/error";
import { statusCode } from "../types/types";
import { orderSchema } from "../utils/zod";
import Product from "../models/product";
import ErrorHandler from "../utils/ErrorClass";
import { Order } from "../models/order";
import { Request } from "express";

// Controller for Create Order
export const createOrder = asyncHandler(async (req, res, next) => {
  const validateData = orderSchema.parse(req.body);

  for (const item of validateData.orderItems) {
    const product = await Product.findById(item.productId);
    if (!product)
      return next(
        new ErrorHandler(
          `Product with ID ${item.productId} not found`,
          statusCode.Bad_Request
        )
      );
    if (product.stocks < item.quantity)
      return next(
        new ErrorHandler(
          `Insufficient stock for product ${product.name}`,
          statusCode.Bad_Request
        )
      );
    product.stocks -= item.quantity;
  }

  const totalAmount = validateData.orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const newOrder = new Order({
    ...validateData,
    totalAmount: totalAmount,
  });
  await newOrder.save();

  return res.status(statusCode.Created).json({
    success: true,
    message: "Order created successfully",
    order: newOrder,
  });
});

// Process Order Controller
export const processOrder = asyncHandler(async (req, res, next) => {});

// Get All Orders Controller
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  return res.status(statusCode.OK).json({
    success: true,
    message: "Orders fetched successfully",
    orders: orders,
  });
});

//  Get Order of User Controller
export const getOrdersOfUser = asyncHandler(
  async (req: Request<{ userId: string }>, res, next) => {
    const userId = req.params.userId;
    if (!userId)
      return next(
        new ErrorHandler("user id is required", statusCode.Bad_Request)
      );
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0)
      return next(new ErrorHandler("No order found", statusCode.Not_Found));
    return res.status(statusCode.OK).json({
      success: true,
      message: "Orders fetched successfully",
      orders: orders,
    });
  }
);

// Get a Specific Order
export const getOrderbyId = asyncHandler(
  async (
    req: Request<{ orderId: string }, {}, { userId: string }>,
    res,
    next
  ) => {
    const orderId = req.params.orderId;
    const userId = req.body.userId;

    if (!userId)
      return next(
        new ErrorHandler("user id is required", statusCode.Bad_Request)
      );

    if (!orderId)
      return next(
        new ErrorHandler("order id is required", statusCode.Bad_Request)
      );

    const order = await Order.findById({_id: orderId, userId});
    if (!order)
      return next(new ErrorHandler("order not found", statusCode.Not_Found));

    return res.status(statusCode.OK).json({
      success: true,
      message: "Order fetched successfully",
      order: order,
    });
  }
);
