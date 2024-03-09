class ApiError extends Error{
  constructor(
    statusCode,
    message= 'somthing went wrong',
    errors =[],
    stack = ''
  ){
    super(message)
    this.statusCode = statusCode
    this.Data = null
    this.message = message
    this.sucess = false
    this.errors = errors

    if (stack) {
      this.stack = stack

      
    } else {
      Error.captureStackTrace(this, this.constructor)
      
    }
  }
}
export {ApiError}