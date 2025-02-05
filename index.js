//import library
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const handleError = require("./Middlewares/errorHdl")

const app = express()

//import router
const authRouter = require("./Routes/auth-routes")
const userRouter = require("./Routes/user-routes")

//middlewares
app.use(cors()) // Allow cross domain connection
app.use(morgan("dev")) // Show log in terminal
app.use(express.json()) // reading JSON


//Routing
app.use('/api', authRouter)
app.use('/api', userRouter )


//HandleError
app.use(handleError)

//Start Server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))