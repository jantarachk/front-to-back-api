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

## Step 9 - Prisma
create model in prismaSchema then create prisma.js in Configs
```bash
npx prisma db push
```
``` js
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma
```

update code register at /controllers/auth-controller.js
```js
const createError = require("../Utilities/createError")
const bcrypt = require("bcryptjs")
const prisma = require("../Configs/prisma")

exports.register = async (req,res,next) => {
    try {
    //steps: req.body -> validate -> check if exist -> encrypt bcrypt -> insert to DB -> response to FrontEnd
    //Step 1- req.body
        const { email, firstName, lastName, password, confirmPassword } = req.body
        console.log(email, firstName, lastName, password, confirmPassword)

    //Step 2-validate
        if (!email){
            return createError(400, "Missing Email")
            // return res.status(400).json({ message: "Missing Email"})
        }

        if (!firstName){
            return createError(400, "Missing Firstname")
            // return res.status(400).json({ message: "Missing firstname"})
        }

    //Step 3-check if exist
        const checkEmail = await prisma.profile.findFirst({
            where: {
                email: email,
                //ข้างหน้าชื่อตาราง ข้างหลัง value ที่เรารับมา
            }
        })

        console.log(checkEmail)
        if (checkEmail) {
            return createError(400, "Email is already exist")
        }


    //Step 4-encrypt bcrypt
        const salt = bcrypt.genSaltSync(10)
        // console.log(salt)
        const hashedPassword = bcrypt.hashSync(password,salt)
        // console.log(hashedPassword)

    //Step 5-insert to db
    const profile = await prisma.profile.create({
        data:{
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        }
    })
    //Step 6-response to front end
        res.json({ message: "Register Success"})
    } catch (error) {
        console.log("step 2 catch error")
        next(error)
    }
}

exports.login = async (req,res,next) => {
    try {
        // console.log(aaa)
        res.json({ message: "Hello login"})
    } catch (error) {
        next(error)
    }
}
```

## Step 10 - Login
/controller/auth-controller
``` js
const createError = require("../Utilities/createError")
const bcrypt = require("bcryptjs")
const prisma = require("../Configs/prisma")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) => {
    try {
    //steps: req.body -> validate -> check if exist -> encrypt bcrypt -> insert to DB -> response to FrontEnd
    //Step 1- req.body
        const { email, firstName, lastName, password, confirmPassword } = req.body
        console.log(email, firstName, lastName, password, confirmPassword)

    //Step 2-validate
        if (!email){
            return createError(400, "Missing Email")
            // return res.status(400).json({ message: "Missing Email"})
        }

        if (!firstName){
            return createError(400, "Missing Firstname")
            // return res.status(400).json({ message: "Missing firstname"})
        }

    //Step 3-check if exist
        const checkEmail = await prisma.profile.findFirst({
            where: {
                email: email,
                //ข้างหน้าชื่อตาราง ข้างหลัง value ที่เรารับมา
            }
        })

        console.log(checkEmail)
        if (checkEmail) {
            return createError(400, "Email is already exist")
        }


    //Step 4-encrypt bcrypt
        const salt = bcrypt.genSaltSync(10)
        // console.log(salt)
        const hashedPassword = bcrypt.hashSync(password,salt)
        // console.log(hashedPassword)

    //Step 5-insert to db
    const profile = await prisma.profile.create({
        data:{
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        }
    })
    //Step 6-response to front end
        res.json({ message: "Register Success"})
    } catch (error) {
        console.log("step 2 catch error")
        next(error)
    }
}

exports.login = async (req,res,next) => {
    try {
        //Step 1- req.body
        const { email, password } = req.body
        // console.log(email, password)

        //Step 2- check email and password
        //เช็คอีเมลล์
        const profile = await prisma.profile.findFirst({
            where: {
                email: email
            }
        })
        console.log(profile)
        if (!profile) {
            return createError(400, "Email or Password is invalid")
        }

        //เช็คพาสเวิร์ด
        const isMatch = bcrypt.compareSync(password, profile.password)
        
        if (!isMatch ) {
            return createError(400, "Email or Password is invalid")
        }


        //Step 3- generate token
        
        const payload = {
            id: profile.id,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: profile.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1d"
        })

        console.log (payload)


        //Step 4- response
        res.json({
            message: "Login Success",
            payload: payload,
            token: token
        })

        
        // console.log(aaa)
        res.json({ message: "Hello login"})
    } catch (error) {
        next(error)
    }
}
```

## Step 11 - Current User


## Step 12 - User Controller & Routes
/controllers/user-controller.js
```js
exports.listUsers = async (req,res,next) => {
    try {
        
        res.json({ message: "Hello list all users"})
    } catch (error) {
        next(error)
    }
}

exports.updateRole = async (req,res,next) => {
    try {
        
        res.json({ message: "Hello Update roles" })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req,res,next) => {
    try {
        
        res.json({ message: "Delete User"})
    } catch (error) {
        next(error)
    }

}
```

/routes/user-route.js
```js
const express = require("express")
const router = express.Router()

//import controller
const userController = require("../Controllers/user-controller")


// @Endpoint http://localhost:8000/api/users
router.get('/users', userController.listUsers)
router.patch('/user/update-role', userController.updateRole)
router.delete('/user/:id', userController.deleteUser)

module.exports = router
```

update index.js
```js
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
```