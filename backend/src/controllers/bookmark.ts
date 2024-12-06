import { Request } from "express";
import { asyncHandler } from "../middlewares/error";
import { bookmardSchema, BookmarkType } from "../utils/zod";
import Bookmark from "../models/bookmark";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";


// Add to cart controller
export const AddBookmark = asyncHandler(
  async (req, res, next) => {
    const validateData = bookmardSchema.parse(req.body);

    const existingBookmark = await Bookmark.findOne({
      userId: validateData.userId,
      productId: validateData.productId,
    });

    if (existingBookmark) {
      await existingBookmark.deleteOne();

      return res.status(statusCode.OK).json({
        message: "Product bookmark removed successfully",
        success: true,
      });
    } else {
      const bookmark = await Bookmark.create(validateData);

      return res.status(statusCode.OK).json({
        message: "Product bookmarked successfully",
        success: true,
        bookmark,
      });
    }
  }
);


// GET all bookmark controller
export const AllBookmark = asyncHandler(
  async (req: Request<{ userId: string }>, res, next) => {
    const { userId } = req.params;

    if (!userId)
      return next(
        new ErrorHandler("user ID is required", statusCode.Bad_Request)
      );
    const bookmark = await Bookmark.find({ userId });
    if (!bookmark)
      return next(
        new ErrorHandler(
          "No bookmark found for this user",
          statusCode.Not_Found
        )
      );

      return res.status(statusCode.OK).json({
        message: `All the bookmark for userId: ${userId}`,
        bookmark,
        bookmarkCount: bookmark.length,
        success: true,
      })
  }
);
