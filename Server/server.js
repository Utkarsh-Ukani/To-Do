// dot env import
import dotenv from 'dotenv';
dotenv.config();

// import app from index.js
import app from './app.js';

const port = process.env.PORT || 5050

app.listen(port,()=>{
    console.log("App Listening on port : ",port);
})