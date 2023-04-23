import { Response, Request } from "express";
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
import User from "../../models/userSchema";
require("dotenv").config();

const secret = process.env.SECRET;

export const findUserByEmail = async (email: String) => {
  try {
    const user = await User.findOne({ email, verify: true });
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const verificationToken = uuidv4();

    const newUser = new User({
      email,
      verificationToken,
    });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign(req.body, secret, { expiresIn: "2h" });
    return res.status(200).json(token);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (req: any, res: Response) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }
    await User.findByIdAndUpdate(userId, { $set: { token: null } });
    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};
