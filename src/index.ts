import express,{Response, Request, NextFunction}from "express";
import areaRouter  from "./routes/areaRouter"
import dotenv from "dotenv";
import logger from "morgan";
dotenv.config();



const app = express();
const PORT = process.env.PORT;


app.use(logger("dev"));
app.use(express.json())

app.use("/", areaRouter)

app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}...`)
})

export default app;