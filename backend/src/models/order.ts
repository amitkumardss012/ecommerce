import { model, Schema } from "mongoose";
import { IOrder } from "../types/model.types";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../types/types";

const OrderSchema: Schema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    orderItems: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, "Product ID is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Product quantity is required"],
                min: [1, "Quantity should be at least 1"],
            },
            price: {
                type: Number,
                required: [true, "Product price is required"],
                min: [0, "Product price should be a positive number"],
            },
        },
    ],
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: [true, "Shipping address is required"],
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: [true, "Payment method is required"],
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.Pending,
        required: [true, "Payment status is required"],
    },
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Pending,
        required: [true, "Order status is required"],
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total amount should be a positive number"],
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    canceledAt: {
        type: Date,
    },
    returnedAt: {
        type: Date,
    },
}, { timestamps: true });  // Automatically handles createdAt and updatedAt fields

// Export the model
export const Order = model<IOrder>('Order', OrderSchema);