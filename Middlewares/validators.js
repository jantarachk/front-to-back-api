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

