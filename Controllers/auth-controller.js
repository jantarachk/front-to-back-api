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