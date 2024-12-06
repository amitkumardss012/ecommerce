import { model, Schema } from "mongoose";
import { BookmarkType } from "../utils/zod";


const bookmardSchema = new Schema<BookmarkType>({
    userId: {
        type: String,
        required: [true, "User ID is required"],
        ref: "User"
    },
    productId: {
        type: String,
        required: [true, "Product ID is required"],
        ref: "Product"
    }
},{timestamps: true})

const Bookmark = model<BookmarkType>("Bookmark", bookmardSchema)

export default Bookmark;