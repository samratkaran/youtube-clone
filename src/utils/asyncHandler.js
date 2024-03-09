

const asyncHandler  = (requestHandler) => {
  (req , res , next) => {
    Promise.resolve(requestHandler(req , res , next))
    .catch(err => next(err));
  }
}


export { asyncHandler };


// this is try-catch code 
// this is the common syntax of higher order functions

// const asyncHandler = () =>{}
// asyncHandler = (func) => async ()=>()
// const asyncHandler = (fn) => async (req , res , next)=>    {

//   try {
//     await fn(req , res , next);
    
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message
//     })
//   }

// };


// this is higher order function that call the function inside of it and it didnt using callback function
