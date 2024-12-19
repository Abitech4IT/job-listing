import { Schema, Document, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: string;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

export interface IUserDocument extends Document, IUser {}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema<IUserDocument> = new Schema({
  firstName: {
    type: String,
    require: [true, "please enter your firstName"],
  },
  lastName: {
    type: String,
    require: [true, "please enter your lastName"],
  },
  email: {
    type: String,
    require: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    require: [true, "please provide your password"],
    unique: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

export const User = model<IUser>("User", userSchema);
