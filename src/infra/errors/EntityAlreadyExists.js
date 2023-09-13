module.exports = function notFound (message, errorCode) {
  Error.captureStackTrace(this, this.constructor)

  this.name = this.constructor.name
  this.message = message || 'Invalid unique constraints'
  this.statusCode = 400
  this.errorCode = errorCode || 400
}
