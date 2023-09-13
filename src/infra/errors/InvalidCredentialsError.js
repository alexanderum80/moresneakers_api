module.exports = function notFound (message, errorCode) {
  Error.captureStackTrace(this, this.constructor)

  this.name = this.constructor.name
  this.message = message || 'Invalid credentials'
  this.statusCode = 401
  this.errorCode = errorCode || 401
}
