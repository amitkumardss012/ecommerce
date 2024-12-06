import { Request } from "express";
import { asyncHandler } from "../middlewares/error";
import { newProductRequestBody, statusCode, UpdateProductRequestBody } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import Product from "../models/product";
import { deleteImages, handleImages } from "../helpers/fs";
import { skip } from "node:test";

// Create product controller
export const createProduct = asyncHandler(
  async (req: Request<{}, {}, newProductRequestBody>, res, next) => {

    const { name, brandName, category, description, price, stocks } = req.body;
    const images = req.files as Express.Multer.File[];

    if (!name || !brandName || !category || !description || !images || !price || !stocks) {
        return next(new ErrorHandler("All fields are required", statusCode.Bad_Request));
      }
    const imageObjects = images.map((image) => ({
      url: `/uploads/${image.filename}`,
    }));

    const product = await Product.create({
      name,
      brandName,
      category,
      description,
      images: imageObjects,
      price,
      stocks,
    });

    res.status(statusCode.Created).json({
      success: true,
      message: "product created success fully",
      product,
    });
  }
);

// Update product controller
export const updateProduct = asyncHandler(
  async (req: Request<{ id: string }, {}, UpdateProductRequestBody>, res, next) => {

    const productId = req.params.id;
    const { name, brandName, category, description, price, stocks } = req.body;
    const images = req.files as Express.Multer.File[];

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler('Product not found', statusCode.Not_Found));
    }

    if (name) product.name = name;
    if (brandName) product.brandName = brandName;
    if (category) product.category = category;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (stocks !== undefined) product.stocks = stocks;

    // Handle image uploads
    if (images && images.length > 0) {
      product.images = handleImages(product.images, images)
    }

    await product.save();

    res.status(statusCode.OK).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  }
);

// Delete product controller
export const deleteProduct = asyncHandler(async(req, res, next) => {
  const productId = req.params.id;
  if(!productId){
    return next(new ErrorHandler("please provide productId", statusCode.Bad_Request))
  }

  const product = await Product.findById(productId);
  if(!product){
    return next(new ErrorHandler("product not found", statusCode.Not_Found));
  }

  const proudctImages = product.images.map(image => image.url)

  deleteImages(proudctImages)

  await product.deleteOne();

  return res.status(statusCode.OK).json({
    success: true,
    message: "proudct delete successfully"
  })
})

// Get 5 latest product from database
export const getLatestProduct = asyncHandler(async(req, res, next) => {
  const latestProduct = await Product.find().sort({createdAt: -1}).limit(5);
  res.status(statusCode.OK).json({
    success: true,
    message: "latest product from database",
    count: latestProduct.length,
    latestProduct
  })
})

// Get all the Categories of product
export const getAllCategories = asyncHandler(async(req, res, next) => {
  const category = await Product.distinct('category');
  return res.status(statusCode.OK).json({
    success: true,
    message: "all the category of products",
    category
  })
})


// Controller to get all unique brand names based on category
export const getBrandNamesByCategory = asyncHandler(
  async (req: Request<{ category: string }>, res, next) => {
    const { category } = req.params;

    if (!category) {
      return next(new ErrorHandler('Category is required', statusCode.Bad_Request));
    }

    const brandNames = await Product.distinct('brandName', { category });

    res.status(statusCode.OK).json({
      success: true,
      brandNames,
    });
  }
);

// Controller for get all the products from database using pagination
export const getAllProducts = asyncHandler(async(req, res, next) => {
  

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(process.env.limit || "") || 10;
  const skip = (page - 1) * limit;

  const totalProudts = await Product.countDocuments();

  const products = await Product.find().skip(skip).limit(limit);

  res.status(statusCode.OK).json({
    success: true,
    count: products.length,
    totalProudts,
    currentPage: page,
    totalPage: Math.ceil(totalProudts / limit),
    products
  })

})

// Controller to get details of single prodcuts
export const getSingleProduct = asyncHandler(async(req: Request<{id: string}>, res, next) => {
  const productId = req.params.id;
  if(!productId){
     return next(new ErrorHandler("product id is required", statusCode.Bad_Request));
  }

  const singleProduct = await Product.findById(productId);
  if(!singleProduct){
    return next(new ErrorHandler("proudct not found", statusCode.Not_Found))
  }

  res.status(statusCode.OK).json({
    success: true,
    message: "Product details retrieved successfully",
    singleProduct,
  })
})