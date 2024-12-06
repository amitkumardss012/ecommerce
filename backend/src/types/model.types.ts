import { Document, Schema, Types } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from './types';

// Interface for Product Schema
export interface IProduct extends Document{
    name: string;
    description: string;
    price: number;
    category: string;
    brandName: string;
    stocks: number;
    images: {
        url: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}


// Interface for Address Schema
export interface IAddress extends Document {
    userId: Schema.Types.ObjectId; 
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
    phoneNumber?: string;
    isDefault: boolean;
    addressType: 'home' | 'work';
    createdAt: Date;
    updatedAt: Date;
}
  



// Interface for Order Schema
export interface IOrder extends Document {
    userId: Schema.Types.ObjectId;
    orderItems: {
        productId: Schema.Types.ObjectId | IProduct;
        quantity: number;
        price: number;
    }[];
    shippingAddress: Schema.Types.ObjectId | IAddress;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    totalAmount: number;
    discount: number;
    tax?: number;
    shippingFee?: number;
    isPaid: boolean;
    paidAt?: Date;
    deliveredAt?: Date;
    canceledAt?: Date;
    returnedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}