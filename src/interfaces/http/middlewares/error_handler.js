const Status = require('http-status')

/* istanbul ignore next */
module.exports = (err, req, res, next, logger, config) => { // eslint-disable-line no-unused-vars
  const { response: { Fail } } = require('src/container').cradle
  logger.error(err)

  if (!err.statusCode) {
    err.statusCode = Status.INTERNAL_SERVER_ERROR
  }
  const response = Fail(err.message)
  res.status(err.statusCode).json(response)
}
