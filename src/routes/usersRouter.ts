import { Router } from "express";
import {
  registerNewUser,
  loginUser,
  logoutUser,
} from "../controllers/users/usersController";
import authMiddleware from "../middlewares/authMiddleware";

const usersRouter = Router();

usersRouter.post("/register", registerNewUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/logout", logoutUser);

export default usersRouter;
