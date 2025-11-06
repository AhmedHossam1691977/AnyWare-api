import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { xss } from "express-xss-sanitizer"
import hpp from"hpp"
import helmet from"helmet"  
import connectDB from "./DataBase/DataBase.connection.js";
import bootstrap from "./src/modules/bootstrap.js"
import { handleError } from "./src/middleware/handelError.js";

const app=express()
app.use(cors())
app.use(express.json())
app.use(xss());
app.use(hpp());
app.use(helmet());


const port = process.env.PORT || 3000;
dotenv.config();

app.get("/",(req,res)=>{
    res.send("hello")
})


connectDB()
bootstrap(app)
app.use(handleError)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


