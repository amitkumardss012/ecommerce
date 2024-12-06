import { Request } from "express";
import { asyncHandler } from "../middlewares/error";
import { AddressInput, addressSchema } from "../utils/zod";
import { statusCode } from "../types/types";
import Address from "../models/address";
import { Types } from "mongoose";
import ErrorHandler from "../utils/ErrorClass";

// Create Address controller
export const createAddress = asyncHandler(
  async (req: Request<{}, {}, AddressInput>, res, next) => {
    const validateData: AddressInput = addressSchema.parse(req.body);

    const createdAddress = await Address.create(validateData);

    return res.status(statusCode.Created).json({
      success: true,
      message: "Address created successfully",
      data: createdAddress,
    });
  }
);

// Update Address controller
export const updateAddress = asyncHandler(
  async (
    req: Request<{ id: string }, {}, Partial<AddressInput>>,
    res,
    next
  ) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id))
      return next(new ErrorHandler("invalid id", statusCode.Bad_Request));

    const updateData = addressSchema.partial().parse(req.body);

    const updatedAddress = await Address.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAddress)
      return next(new ErrorHandler("Address not found", statusCode.Not_Found));

    return res.status(statusCode.OK).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  }
);

// Delete Address controllere
export const deleteAddress = asyncHandler(
  async (req: Request<{ id: string }>, res, next) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id))
      return next(new ErrorHandler("invaild id", statusCode.Bad_Request));

    const deleteAddress = await Address.findByIdAndDelete(id);

    if (!deleteAddress)
      return next(new ErrorHandler("Address not found", statusCode.Not_Found));

    return res
      .status(statusCode.OK)
      .json({ message: "address deleted successfull", success: true });
  }
);

// Get all the address of a user
export const getAllAddressOfUser = asyncHandler(
  async (req: Request<{ userId: string }>, res, next) => {
    const { userId } = req.params;

    if (!Types.ObjectId.isValid(userId))
      return next(new ErrorHandler("invaild id", statusCode.Bad_Request));

    const address = await Address.find({ userId });

    // if (!address || address.length === 0) return next(new ErrorHandler("No address found", statusCode.Not_Found));

    return res.status(statusCode.OK).json({
      success: true,
      message: "address fetched successfull",
      address: address,
    });
  }
);

// TODO: get a specific Address
