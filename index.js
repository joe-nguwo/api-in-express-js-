import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import router from "./routes/getUsers.js";
const app = express();

// cutsome middieware
function time(req, res, next) {
  console.log(
    `request day and time:  ${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  );
  next();
}
const limiter = rateLimit({
  max: 2,
  windowMs: 60 * 1000, // one minute
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      message: "Too many requests from this IP. Please try again after 1 minute."
    });
  }
});
app.use(limiter)
app.use(time);
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

app.use("/users", router);

app.listen(PORT, console.log(`server ruuning on port ${PORT}`));
