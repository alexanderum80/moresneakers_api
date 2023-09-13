const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')
const baseUrl = process.env.IMAGE_URL || 'http://localhost:3000/api/images/'

module.exports = () => {
  const router = Router()
  const { auth, response: { Success }, upload } = container.cradle
  router.post('/editor', upload.file, function (req, res, next) {
    const filename = req.file.filename || req.file.key
    const response = {
      status: true,
      originalName: req.file.originalname,
      generatedName: filename,
      msg: 'Image upload successful',
      imageUrl: (baseUrl + filename)
    }
    res.status(Status.OK).json(response)
  })

  router.use(auth.authenticate())

  router.post('/', upload.image, function (req, res, next) {
    const filename = req.file.filename || req.file.key
    res.status(Status.OK).json(Success({ url: (baseUrl + filename) }))
  })

  router.post('/:newfilename', upload.image, function (req, res, next) {
    const filename = req.file.filename || req.file.key
    res.status(Status.OK).json(Success({ url: (baseUrl + req.params.newfilename + '.' + filename.split('.')[1]) }))
  })

  return router
}
