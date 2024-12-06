import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async (url: string) => {
   try {
       const connection = await mongoose.connect(url, { dbName: `${DB_NAME}` });
       console.log(`DataBase connected to ${connection.connection.host}`);
   } catch (error) {
       console.log("error while connecting to DataBase", error);
       process.exit(1);
   }
}

export default connectDB