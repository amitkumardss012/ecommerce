import dotenv from "dotenv"

dotenv.config({
    path: ".env"
})

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_NAME = process.env.DB_NAME;