const createError = require("../Utilities/createError")

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
    //Step 4-encrypt bcrypt
    //Step 5-insert to db
    //Step 6-response to front end

        res.json({ message: "Hello register"})
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