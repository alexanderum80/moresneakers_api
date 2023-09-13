const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')
const { generateDeeplinkUseCase } = require('src/app/deeplink')

module.exports = () => {
  const router = Router()
  const { auth, response: { Success } } = container.cradle

  router.post('/', function (req, res, next) {
    generateDeeplinkUseCase(req.body.url, req.body.trackingUrl).then((data) => {
      res.status(Status.OK).json(Success(data))
    }).catch((error) => {
      next(error)
    })
  })

  router.use(auth.authenticate())
  return router
}
