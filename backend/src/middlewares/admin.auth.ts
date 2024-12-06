
import User from "../models/user";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { verifyToken } from "../helpers/jwt";
import { asyncHandler } from "./error";

export const isAuthenticated = asyncHandler(async(req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return next(new ErrorHandler("you are not logedIn", statusCode.Unauthorized))
    }

    const payload = verifyToken(token);
    const logedInUserID = payload?.userID;

    if(!logedInUserID){
        return next(new ErrorHandler("invaild token", statusCode.Unauthorized))
    }

    const user = await User.findById(logedInUserID).select('-password')
    if(!user) {
        return next(new ErrorHandler("user not found login first", statusCode.Not_Found))
    }

    next();
})


export const isAdmin = asyncHandler(async(req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return next(new ErrorHandler("you are not logedIn", statusCode.Unauthorized))
    }

    const payload = verifyToken(token);
    const logedInUserID = payload?.userID;

    if(!logedInUserID){
        return next(new ErrorHandler("invaild token", statusCode.Unauthorized))
    }

    const user = await User.findById(logedInUserID).select('-password');

    if(!user) {
        return next(new ErrorHandler("user not found login first", statusCode.Not_Found))
    }

    if(user.role !== 'admin'){
        return next(new ErrorHandler("you are not authorized as an admin", statusCode.Forbidden))
    }else{
        next();
    }
})

