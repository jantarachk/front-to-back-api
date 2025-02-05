# Server

## Step 1 - Create package
```bash
npm init -y
```

## Step 2 - Install package
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
npx prisma init 
```

## Step 3 - Git Initialize
```bash
git init
git add .
git commit -m "Initialize project"
```

Next step is copy code from repo only first time.
```bash
git remote add origin https://github.com/jantarachk/front-to-back-api.git
git branch -m main
git push -u origin main
```

When update code
```bash
git add .
git commit -m "message"
git push
```

## Step 4 - Update package JSON
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  }
```
and code inside index.js
```js
//import library
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

//middlewares
app.use(cors()) // Allow cross domain connection
app.use(morgan("dev")) // Show log in terminal
app.use(express.json()) // reading JSON

//Routing

//Start Server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))
```

## Step 5 - Create Routes and Controllers

Authen router and controllers
```js
//auth-routes

```

## Step 6 - Create middlewares: errorHandler and notFoundHandler
```js
//Handle error middleware
const handleError = (err,req,res,next) => {
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" })
}
module.exports = handleError

//Handle Not found middleware

```
and use in index.js
```js
const handleError = require("./Middlewares/errorHdl")

app.use(handleError)

```

## Step 7 - Create utilities-createError
```js
const createError = (code,message) =>{
    console.log("step1 - create error")
    const error = new Error (message);
    error.statusCode = code
    throw error
}


module.exports = createError
```

and then imported to controllers

## Step 8 - Create Middleware-Validator
```js
const { z } = require("zod")

// Test Validator
exports.registerSchema = z.object({
    email: z.string().email("รู้จัก email รึป่าวจ้ะว่าต้องพิมพ์ยังไง"),
    firstName: z.string().min(3,"Firstname ต้องมากกว่า 3 จ้ะ"),
    lastName: z.string().min(3, "3 ตัวจ้ะ ต้องให้บอกหรอ"),
    password: z.string().min(6, "6 ตัวจ้าาาาาาา"),
    confirmPassword: z.string().min(6, "6 ตัวจ้ะ")
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password not match จ้าาา",
    path: ["confirmPassword"]
})

exports.loginSchema = z.object({
    email: z.string().email("รู้จัก email รึป่าวจ้ะว่าต้องพิมพ์ยังไง"),
    password: z.string().min(6, "6 ตัวจ้าาาาาาา"),
})


exports.validateWithZod = (schema) => (req,res,next) =>{
    try {
        console.log("Hello Middleware")
        schema.parse(req.body)
        next()
    } catch (error) {
        const errMsg = error.errors.map( el => el.message )
        const errTxt = errMsg.join(",")
        const mergeError = new Error(errTxt)
        next(mergeError)
    }
}
```

Don't forget to import to auth-route

```js
const { registerSchema, loginSchema, validateWithZod } = require("../Middlewares/validators")

//@endpoint http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authController.register)
router.post("/login", validateWithZod(loginSchema), authController.login)

```