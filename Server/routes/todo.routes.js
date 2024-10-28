import {Router} from "express"
import { addTodo, deleteTodo, fetchAllTodos, updateTodo } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.get("/",fetchAllTodos);
todoRouter.post("/",addTodo);
todoRouter.put("/:id",updateTodo)
todoRouter.delete("/:id",deleteTodo)

export default todoRouter;