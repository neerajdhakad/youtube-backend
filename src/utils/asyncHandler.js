//By using Promise
const asyncHandler = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}

// This code defines a function asyncHandler that takes a requestHandler as an argument.
// The asyncHandler function returns an anonymous function that handles the request and response, as well as the next middleware function.
// It ensures that the requestHandler is executed within a Promise context and catches any errors that occur.
// The asyncHandler function is exported to be used elsewhere.

//Higher order funtion because it takes a function as an argument
// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

