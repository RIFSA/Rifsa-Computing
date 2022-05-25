import express from "express";
import db from "./config/database.js";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import cors from "cors";


dotenv.config();


const app = express();

app.use(cors({credential: true, origin:'*'}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(router);


try {
    await db.authenticate();
    console.log("Database Connected....")
} catch (error) {
    console.error(error);

}



app.listen(5000, ()=> console.log("Server Running at port 5000"))