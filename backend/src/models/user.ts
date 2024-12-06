import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";

interface Iuser extends Document {
  name: string;
  photo: string;
  email: string;
  password: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual Attribute
  age: number;
  addresses: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please enter your name"],
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
    },
    photo: {
      type: String,
      required: [true, "please add photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "please enter your gender"],
    },
    dob: {
      type: Date,
      required: [true, "please enter your Date of birth"],
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const todya = new Date();
  const dob = this.dob;
  let age = todya.getFullYear() - dob.getFullYear();
  if (
    todya.getMonth() < dob.getMonth() ||
    (todya.getMonth() === dob.getMonth() && todya.getDate() < dob.getDate())
  ) {
    age--;
  }
});

const User = mongoose.model<Iuser>("Users", userSchema);

export default User;
