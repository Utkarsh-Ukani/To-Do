import express from "express"
import todoRouter from "./routes/todo.routes.js";
import cors from "cors"
const app = express()

// use some middleware for parsing data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors({
    origin:process.env.FRONTEND_URL
}))

// routes
app.use("/api/todo",todoRouter)

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

export default app;