import { Request } from "express";
import { newUserRequestBody, statusCode } from "../types/types";
import { asyncHandler } from "../middlewares/error";
import User from "../models/user";
import ErrorHandler from "../utils/ErrorClass";
import { generateToken, verifyToken } from "../helpers/jwt";
import dotenv from "dotenv";

dotenv.config();

export const signUP = asyncHandler(
  async (req: Request<{}, {}, newUserRequestBody>, res, next) => {
    const { dob, email, password, gender, name, photo } = req.body;
    if (!(dob || email || password || gender || name || photo)) {
      return next(
        new ErrorHandler("all fields are required", statusCode.Bad_Request)
      );
    }

    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return next(
        new ErrorHandler("email already exists", statusCode.Conflict)
      );
    }

    const newUser = await User.create({
      dob: new Date(dob),
      email,
      password,
      gender,
      name,
      photo,
    });

    const token = generateToken(newUser._id.toString());

    return res
      .status(statusCode.Created)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 360000,
      })
      .json({
        success: true,
        message: "account created successfully",
        token,
        newUser,
      });
  }
);

export const logIn = asyncHandler(
  async (req: Request<{}, {}, newUserRequestBody>, res, next) => {
    const { email, password } = req.body;
    if (!(email || password)) {
      return next(
        new ErrorHandler("all field are required", statusCode.Bad_Request)
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(
        new ErrorHandler(
          "email does't exist in database",
          statusCode.Unauthorized
        )
      );
    }

    if (password !== existingUser.password) {
      return next(new ErrorHandler("wrong password", statusCode.Unauthorized));
    }

    const token = generateToken(existingUser._id.toString());

    return res
      .status(statusCode.OK)
      .cookie("token", token, { httpOnly: true, maxAge: 360000 })
      .json({
        success: true,
        message: `welcome back ${existingUser.name}`,
      });
  }
);

export const logOut = asyncHandler(async (req, res, next) => {
  return res.status(statusCode.No_Content).cookie("token", "", {expires: new Date(Date.now())}).json({
    success: true,
    message: "logOut successfully",
  });
});


export const getUserByID = asyncHandler(async(req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return next(new ErrorHandler("token not found", statusCode.Bad_Request))
    }
    const payload = verifyToken(token);
    const logedInUserID = payload?.userID; 

    if (!logedInUserID) {
      return next(new ErrorHandler("Invalid token", statusCode.Unauthorized)); 
    }

    const user = await User.findById(logedInUserID); 

    if (!user) {
      return next(new ErrorHandler("User not found", statusCode.Not_Found)); 
    }

    return res.status(statusCode.OK).json({
      success: true,
      user,
      payload
    });
})
