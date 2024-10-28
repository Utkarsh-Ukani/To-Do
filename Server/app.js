import express from "express"
import todoRouter from "./routes/todo.routes.js";
const app = express()

// use some middleware for parsing data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/todo",todoRouter)

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

export default app;