import  { Router } from "express"
import { getUserByID, logIn, logOut, signUP } from "../controllers/user";
import { isAuthenticated } from "../middlewares/admin.auth";

const userRoute = Router();


userRoute.post("/create", signUP)
userRoute.post("/login", logIn)
userRoute.get("/logout", logOut)
userRoute.get("/userDetials", isAuthenticated, getUserByID)
export default userRoute;
