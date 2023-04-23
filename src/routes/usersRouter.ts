import { Router, Response, Request } from "express";

const {
  registerNewUser,
  loginUser,
  logoutUser,
} = require("../../models/usersController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const usersRouter = Router();

usersRouter.post("/register", async (req: Request, res: Response) => {
  const newUser = await registerNewUser(req.body);
  res.json(newUser);
});

usersRouter.post("/login", async (req: Request, res: Response) => {
  const response = await loginUser(req.body);
  res.json(response);
});

module.exports = usersRouter;
