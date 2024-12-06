import { model, Schema } from "mongoose";

const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, "coupon code is required"],
        unique: true
    },
    discount: {
        type: Number,
        required: [true, "coupon discount is required"],
        min: [0, "coupon discount should be a positive number"]
    }
})

const Coupon = model("Coupon", couponSchema)

export default Coupon;
