import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos/todosController";
import authMiddleware from "../middlewares/authMiddleware";

const todosRouter: Router = Router();
todosRouter.use(authMiddleware);

todosRouter.get("/todos", getTodos);
todosRouter.post("/add-todo", addTodo);
todosRouter.put("/edit-todo/:id", updateTodo);
todosRouter.delete("/delete-todo/:id", deleteTodo);

export default todosRouter;
