import express from "express"
import  dotenv  from "dotenv"
import router from "./routes/getUsers.js"
const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use("/users",router)


app.listen(PORT,console.log(`server ruuning on port ${PORT}`))