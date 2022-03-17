import { Document, model, Schema } from "mongoose";
import { UserDetails } from "../user";
import { makeUserDb } from "./user-db";

export interface UserDocument extends Document, UserDetails {
  isAdmin: boolean;
}

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 0,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1025,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

export const userModel = model<UserDocument>("User", userSchema);
export const userDb = makeUserDb(userModel);

export type UserModel = typeof userModel;
export type UserDb = typeof userDb;
