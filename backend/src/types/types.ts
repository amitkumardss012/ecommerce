import { NextFunction, Request, Response } from "express";

export interface newUserRequestBody {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  gender: string;
  dob: Date;
}

export interface newProductRequestBody {
  name: string;
  description: string;
  price: number;
  category: string;
  brandName: string;
  stocks: number;
  images: {
    url: string;
  }[];
}

export interface UpdateProductRequestBody {
  name?: string;
  brandName?: string;
  category?: string;
  description?: string;
  price?: number;
  stocks?: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;


// Enum for StatusCode
export enum statusCode {
  // status code start with 200
  OK = 200,
  Created = 201,
  No_Content = 204,

  // status code start with 400
  Bad_Request = 400,
  Unauthorized = 401,
  Payment_Required = 402,
  Forbidden = 403,
  Not_Found = 404,
  Conflict = 409,

  // status code start with 500
  Internal_Server_Error = 500,
}

// Enum for OrderStatus
export enum OrderStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    Returned = 'Returned',
}

// Enum for Payment Status
export enum PaymentStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Failed = 'Failed',
    Refunded = 'Refunded',
}

// Enum for Payment Methods
export enum PaymentMethod {
    CreditCard = 'Credit Card',
    PayPal = 'PayPal',
    BankTransfer = 'Bank Transfer',
    CashOnDelivery = 'Cash on Delivery',
}