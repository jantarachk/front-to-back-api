// 1.List all users
// 2.Update Role
// 3.Delete User


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