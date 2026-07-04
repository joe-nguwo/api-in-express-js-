import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors"
import router from "./routes/getUsers.js";
import {conn} from "./db/dbConn.js"
import { Customers } from "./models/customers.js";
const app = express();
dotenv.config();
const PORT = 3000;

async function startServer(){

  try{

    await conn();
    console.log("connection established");

    await Customers.sync({ alter:true });
    console.log("table synced");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });

  }
  catch(error){
    console.log("database connection failed", error);
  }

}


function time(req, res, next) {
  console.log(
    `request day and time:  ${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  );
  next();
}
const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 1000, // one minute
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      message: "Too many requests from this IP. Please try again after 1 minute."
    });
  }
});
app.use(cors())
app.use(limiter)
app.use(time);
app.use(express.json());

dotenv.config();


app.use("/api/v1/", router);

startServer();
