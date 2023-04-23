import { Request } from "express";
import { Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
