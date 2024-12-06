import { Schema, model } from "mongoose";
import { IProduct } from "../types/model.types";

const ProductSchema: Schema = new Schema<IProduct>({
    name:{
        type: String,
        required: [true, "product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "product description is required"],
        maxlength: [1000, "product descript should not more the 1000 characters"],
    },
    price: {
        type: Number,
        required: [true, "product price is required"],
        min: [0, "product price should be a positive number"],
    },
    category: {
        type: String,
        required: [true, "product category is required"],
        trim: true,
    },
    brandName: {
        type: String,
        required: [true, "product brand is required"],
        trim: true,
    },
    stocks: {
        type: Number,
        required: [true, "product stock is required"],
        min: [0, "product stock should be a positive number"],
        default: 0,
    },
    images: [
        {
            url: {
                type: String,
                required: [true, "image url is required"]
            }
        }
    ]
},{timestamps: true})


ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brandName: 1 });
ProductSchema.index({ stocks: 1 });
ProductSchema.index({ images: 1 })

const Product = model<IProduct>("Products", ProductSchema)

export default Product;