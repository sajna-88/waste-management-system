const express= require ("express")
const app = express ()
const PORT=3000
const db=require("./database")
const bodyParser = require("body-parser")
const cors= require("cors")

const userRouter = require("./router/router");

app.use (bodyParser.json())
app.use(cors())

// connectDB(); // Database connection call

app.use('/api/users', userRouter);

app.listen(PORT,()=>{console.log("server is connected")})
