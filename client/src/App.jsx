import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/index";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = async (todo) => {
    try {
      // Send the todo data to the backend
      const response = await axios.post('/api/todo', todo);
      const newTodo = response.data.data; 
  
      // Update the local state with the new todo
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  

  const updateTodo = async (id, todo) => {
    try {
      // send the new data to the backend for updating the todo
      const response = await axios.put(`/api/todo/${id}`, todo);
      const updatedTodo = response.data.data;

      // Update the local state with updated todo
      setTodos((prev) =>
        prev.map((eachTodo) =>
          eachTodo.id === id ? updatedTodo : eachTodo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  const deleteTodo = async (id) => {
    try {
      // delete the todo 
      await axios.delete(`/api/todo/${id}`);

      // update the local state
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id,isCompleted) => {
    try {

      // change the state of todo
      const response = await axios.patch(`/api/todo/${id}`,isCompleted)
      const updatedTodo = response.data.data
      console.log(updatedTodo);
      setTodos((prev) =>
        prev.map((prevTodo) =>
          prevTodo.id === id
            ? updatedTodo
            : prevTodo
        )
      );
    } catch (error) {
      console.log("Error while changing todo state", error);
    }
  };
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todo");
        const storedTodos = response.data.data;
        console.log(storedTodos);

        // Check if the response data is already in JSON format
        if (
          storedTodos &&
          Array.isArray(storedTodos) &&
          storedTodos.length > 0
        ) {
          setTodos(storedTodos);
        } else {
          // If the response needs to be parsed, use JSON.parse
          const parsedTodos = JSON.parse(storedTodos);

          if (
            parsedTodos &&
            Array.isArray(parsedTodos) &&
            parsedTodos.length > 0
          ) {
            setTodos(parsedTodos);
          }
        }
      } catch (error) {
        // Log the error and set an empty array if parsing fails or data is unavailable
        console.error("Error fetching or parsing todos:", error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);


  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
