exports.register = async (req,res,next) => {
    try {
        res.json({ message: "Hello register"})
    } catch (error) {
        next(error)
    }
}

exports.login = async (req,res,next) => {
    try {
        console.log(aaa)
        res.json({ message: "Hello login"})
    } catch (error) {
        next(error)
    }
}