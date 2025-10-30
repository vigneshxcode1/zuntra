import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import Messagerouter  from "./routers/Messagerouter.js"
import TaskRouter from './routers/Taskrouter.js';
import UserRouter from './routers/UserRouter.js';


const app = express();
dotenv.config()
console.log(process.env)
app.use(cookieParser());
app.use(
  cors({
     //origin: "http://localhost:5173",
      origin: "https://zuntra-backend.onrender.com",
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],             
  })
);
app.use(express.json());



app.use("/api/v1",UserRouter );
app.use("/api/v1", Messagerouter);
app.use("/api/v1", TaskRouter);

mongoose.connect("mongodb+srv://vicky:test123@cluster0.epdrsry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
console.log("mongodb connected")
})


app.listen(5000,()=>{
console.log("port connected",process.env.PORT);
})

