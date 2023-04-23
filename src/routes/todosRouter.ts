import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos/todosController";

const todosRouter: Router = Router();

todosRouter.get("/todos", getTodos);
todosRouter.post("/add-todo", addTodo);
todosRouter.put("/edit-todo/:id", updateTodo);
todosRouter.delete("/delete-todo/:id", deleteTodo);

export default todosRouter;
