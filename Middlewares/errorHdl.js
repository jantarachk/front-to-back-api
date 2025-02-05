const handleError = (err,req,res,next) => {

    console.log("step 3- hanle error")
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" })
}

module.exports = handleError

// or first true, and first false