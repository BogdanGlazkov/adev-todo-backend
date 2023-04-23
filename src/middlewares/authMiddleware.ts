import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const secret = process.env.SECRET;

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const [, token] = await req.headers.authorization.split(" ");
    if (!token) {
      throw new Error();
    }
    const requestedUser = await jwt.decode(token, secret);
    const existedUser = await User.findOne({ email: requestedUser.email });

    if (!existedUser) {
      throw new Error();
    }

    if (existedUser.token !== token) {
      throw new Error();
    }

    req.user = existedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
};

export default authMiddleware;
