import { model, Schema } from "mongoose";
import { IAddress } from "../types/model.types";

const AddressSchema = new Schema<IAddress>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    street: {
        type: String,
        required: [true, "street is required"],
        trim: true,
        minlength: [10, "Street must be at least 10 character long"],
        maxlength: [200, "Street cannot be longer than 200 characters"],
    },
    city: {
        type: String,
        required: [true, "city name is required"],
        trim: true,
        minlength: [1, "City must be at least 1 character long"],
        maxlength: [100, "City cannot be longer than 100 characters"],
    },
    state: {
        type: String,
        required: [true, "state name is required"],
        trim: true,
        minlength: [1, "State must be at least 1 character long"],
        maxlength: [100, "State cannot be longer than 100 characters"],
    },
    pinCode: {
        type: String,
        required: [true, "pin code is required"],
        trim: true,
        minlength: [1, "PinCode must be at least 1 character long"],
        maxlength: [100, "PinCode cannot be longer than 100 characters"],
    },
    country: {
        type: String,
        required: [true, "country name is required"],
        trim: true,
        minlength: [1, "Country must be at least 1 character long"],
        maxlength: [100, "Country cannot be longer than 100 characters"],
    },
    phoneNumber: {
        type: String,
        required: [true, "phone number is required"],
        trim: true,
        minlength: [10, "PhoneNumber must be at least 10 character long"],
        maxlength: [10, "PhoneNumber cannot be longer than 10 characters"],
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    addressType: {
        type: String,
        enum: ['home', 'work'],
        default: 'home',
    }
},{timestamps: true})

AddressSchema.index({ userId: 1, isDefault: 1 }, { unique: true, partialFilterExpression: { isDefault: true } });

// Indexes for frequently queried fields
AddressSchema.index({ city: 1 });
AddressSchema.index({ postalCode: 1 });
AddressSchema.index({ country: 1 });

const Address = model<IAddress>('Address', AddressSchema);

export default Address;