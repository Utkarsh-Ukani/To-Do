import prisma from "../config/db.config.js";

export const addTodo = async (req, res) => {
  const { content } = req.body;

  // check content is present or not
  if (!content) {
    return res.json({ status: 400, message: "content not found" });
  }

  try {
    // create todo
    const todo = await prisma.todo.create({
      data: {
        content,
      },
    });

    return res.json({
      status: 200,
      data: todo,
      message: "Todo Added Successfully",
    });
  } catch (error) {
    return res.json({
      status: 500,
      error: error,
      message: "Error while adding todo",
    });
  }
};

export const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { content } = req.body;

  // check content is present or not
  if (!content) {
    return res.json({ status: 400, message: "content not found" });
  }

  try {
    // uodate todo
    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        content,
      },
    });

    return res.json({
      status: 200,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.json({
      status: 500,
      error: error,
      message: "Error while updating todo",
    });
  }
};

export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    // delete todo
    await prisma.todo.delete({
      where: {
        id: Number(todoId),
      },
    });

    return res.json({ status: 200, message: "todo deleted successfully" });
  } catch (error) {
    return res.json({
      status: 500,
      error: error,
      message: "Error while deleting todo",
    });
  }
};

export const fetchAllTodos = async (req, res) => {
  try {
    // fetching all todos
    const allTodos = await prisma.todo.findMany({});
    console.log(allTodos);

    return res.json({
      status: 200,
      data: allTodos,
      message: "All todos fetched successfully",
    });
  } catch (error) {
    return res.json({
      status: 500,
      error: error,
      message: "Error while fetching all todos",
    });
  }
};

export const changeTodoState = async (req, res) => {
  const todoId = req.params.id;
  const { isCompleted } = req.body;

  // Check if isCompleted is not provided
  if (isCompleted === undefined) {
    return res.json({
      status: 400,
      message: "Please provide the current state of todo, either completed or not completed",
    });
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        isCompleted,
      },
    });
    return res.json({
      status: 200,
      data: updatedTodo,
      message: "Todo state has been changed successfully",
    });
  } catch (error) {
    return res.json({
      status: 500,
      error: error.message,
      message: "Error while updating todo state",
    });
  }
};

