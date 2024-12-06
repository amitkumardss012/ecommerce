import {Router} from "express"
import { AddBookmark, AllBookmark } from "../controllers/bookmark";

const bookmarkRoute = Router();

bookmarkRoute.post("/add", AddBookmark);
bookmarkRoute.get("/all/:userId", AllBookmark);

export default bookmarkRoute;