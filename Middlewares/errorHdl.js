const handleError = (err,req,res,next) => {
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "something wrong" })
}

module.exports = handleError

// or first true, and first false