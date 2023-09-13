const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')
const { getDataUseCase } = require('src/app/analytics')

module.exports = () => {
  const router = Router()
  const { auth, response: { Success } } = container.cradle

  router.get('/', function (req, res, next) {
    getDataUseCase(req.query.eventName).then((data) => {
      res.status(Status.OK).json(Success(data))
    }).catch((error) => {
      next(error)
    })
  })

  router.use(auth.authenticate())
  return router
}
