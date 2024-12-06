import { z } from "zod";
import { Types } from "mongoose";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../types/types";

// Zod Schema validation for Address
export const addressSchema = z
  .object({
    userId: z
      .string({ required_error: "userId is required" })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid userId format",
      }),
    street: z
      .string({ required_error: "Street is required" })
      .min(1, {
        message: "Street is required and must be at least 1 character long",
      })
      .max(200, { message: "Street cannot be longer than 200 characters" })
      .trim(),

    city: z
      .string({ required_error: "City name is required" })
      .min(1, {
        message: "City name is required and must be at least 1 character long",
      })
      .max(100, { message: "City name cannot be longer than 100 characters" })
      .trim(),

    state: z
      .string({ required_error: "State name is required" })
      .min(1, {
        message: "State name is required and must be at least 1 character long",
      })
      .max(100, { message: "State name cannot be longer than 100 characters" })
      .trim(),

    pinCode: z
      .string({ required_error: "Pin code is required" })
      .min(1, {
        message: "Pin code is required and must be at least 1 character long",
      })
      .max(100, { message: "Pin code cannot be longer than 100 characters" })
      .trim(),

    country: z
      .string({ required_error: "Country name is required" })
      .min(1, {
        message:
          "Country name is required and must be at least 1 character long",
      })
      .max(100, {
        message: "Country name cannot be longer than 100 characters",
      })
      .trim(),

    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .length(10, {
        message: "Phone number must be exactly 10 characters long",
      })
      .trim()
      .regex(/^[0-9]{10}$/, {
        message: "Phone number must consist of 10 digits only",
      }),

    isDefault: z.boolean().optional().default(false),

    addressType: z
      .enum(["home", "work"], {
        message: "Address type must be either 'home' or 'work'",
      })
      .default("home"),
  })
  .strict();

export type AddressInput = z.infer<typeof addressSchema>;

// Zod Schema validation for Bookmard
export const bookmardSchema = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid userId forma",
    }),
  productId: z
    .string({ required_error: "productId is required" })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid productId format",
    }),
});

export type BookmarkType = z.infer<typeof bookmardSchema>;

// Zod Schema validation for Order
export const orderSchema = z
  .object({
    userId: z
      .string({
        required_error: "User ID is required",
      })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid user ID format",
      }),
    orderItems: z
      .array(
        z.object({
          productId: z
            .string({
              required_error: "Product ID is required",
            })
            .refine((val) => Types.ObjectId.isValid(val), {
              message: "Invalid product ID format",
            }),
          quantity: z
            .number({
              required_error: "Product quantity is required",
            })
            .min(1, { message: "Quantity should be at least 1" }),
          price: z
            .number({
              required_error: "Product price is required",
            })
            .min(0, { message: "Product price must be a positive number" }),
        }),
        { required_error: "Order Items are required" }
      )
      .min(1, {
        message: "Order must contain at least one item",
      }),
    shippingAddress: z
      .string({ required_error: "Shipping address is required" })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid shipping address format",
      }),
    paymentMethod: z.nativeEnum(PaymentMethod, {
      required_error: "Payment method is required",
    }),
    paymentStatus: z
      .nativeEnum(PaymentStatus, {
        required_error: "Payment status is required",
      })
      .default(PaymentStatus.Pending),
    orderStatus: z
      .nativeEnum(OrderStatus, {
        required_error: "Order status is required",
      })
      .default(OrderStatus.Pending),
    totalAmount: z
      .number({
        required_error: "Total amount is required",
      })
      .min(0, { message: "Total amount must be a positive number" }),
    isPaid: z.boolean().default(false),
    paidAt: z.date().optional(),
    deliveredAt: z.date().optional(),
    canceledAt: z.date().optional(),
    returnedAt: z.date().optional(),
  })
  .strict();
