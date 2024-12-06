import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant";
// import { JWT_SECRET } from "../constant";

const JWT_SECRET_KEY = `${JWT_SECRET}`;

interface JwtPayload {
  userID: string;
}

export const generateToken = (userID: string): string => {
  return jwt.sign({ userID }, JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};
