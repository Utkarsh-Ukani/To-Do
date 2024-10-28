import {Router} from "express"
import { addTodo, changeTodoState, deleteTodo, fetchAllTodos, updateTodo } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.get("/",fetchAllTodos);
todoRouter.post("/",addTodo);
todoRouter.put("/:id",updateTodo)
todoRouter.patch("/:id",changeTodoState)
todoRouter.delete("/:id",deleteTodo)

export default todoRouter;