const createError = (code,message) =>{
    console.log("step1 - create error")
    const error = new Error (message);
    error.statusCode = code
    throw error
}


module.exports = createError