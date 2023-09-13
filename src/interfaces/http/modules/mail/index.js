const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')
const { sendEmailUseCase } = require('src/app/mail')

module.exports = () => {
  const router = Router()
  const { auth, response: { Success } } = container.cradle

  router.post('/', function (req, res, next) {
    sendEmailUseCase(req.body).then(() => {
      res.status(Status.OK).json(Success({ message: 'Message sent' }))
    }).catch((error) => {
      next(error)
    })
  })

  router.use(auth.authenticate())
  return router
}
