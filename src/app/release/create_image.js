const repository = require('src/infra/repositories/release')
const { ReleaseImage } = require('src/domain/release')

const createImage = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body.length) {
        const domains = body.map((imgData) => {
          return new ReleaseImage(imgData)
        })
        return repository.createImages(id, domains)
      }
      const domain = new ReleaseImage(body)
      return repository.createImages(id, [domain])
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createImage }
