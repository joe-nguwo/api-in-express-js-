import express from "express"
import  dotenv  from "dotenv"
import router from "./routes/getUsers.js"
const app = express()

// cutsome middieware
function time(req,res,next){
    console.log(`request day and time:  ${new Date().toDateString()} ${new Date().toLocaleTimeString()}`)
    next()

}
app.use(time)
app.use(express.json())

dotenv.config()
const PORT = process.env.PORT

app.use("/users",router)


app.listen(PORT,console.log(`server ruuning on port ${PORT}`))