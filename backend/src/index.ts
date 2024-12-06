import express from "express";
import connectDB from "./DB/db";
import { errorMiddleware } from "./middlewares/error";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import { DB_URL, PORT } from "./constant";
import cors from "cors";

// imporing Routes
import userRoute from "./routes/user";
import productRoute from "./routes/product";
import addressRoute from "./routes/address";
import bookmarkRoute from "./routes/bookmark";
import orderRoute from "./routes/order";
import couponRouter from "./routes/coupon";
import statsRouter from "./routes/stats";

// DataBase connection
connectDB(`${DB_URL}`);

// All the instance
const app = express();
app.use(cors());

// Middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("hellow world");
});

// All the Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/bookmark", bookmarkRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/stats", statsRouter);

// error middleware --> Global catches
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
