const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
import User from "../../models/userSchema";
import { IUser } from "../../types/types";
require("dotenv").config();

const secret = process.env.SECRET;

const dbFindUserByEmail = async (email: String) => {
  const user = await User.findOne({ email, verify: true });
  return user;
};

const dbRegisterNewUser = async (body: IUser) => {
  const { email, password } = body;
  const verificationToken = uuidv4();

  const newUser = new User({
    email,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  return { email };
};

const dbLoginUser = async (body: IUser) => {
  const token = jwt.sign(body, secret, { expiresIn: "2h" });
  return token;
};

const dbLogoutUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  await User.findByIdAndUpdate(userId, { $set: { token: null } });
};

module.exports = {
  dbFindUserByEmail,
  dbRegisterNewUser,
  dbLoginUser,
  dbLogoutUser,
};
