const repository = require('../../infra/repositories/blog')
const { CreateBlogImage } = require('../../domain/blog')

const createImage = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body.length) {
        const domains = body.map((imgData) => {
          return new CreateBlogImage(imgData)
        })
        return repository.createImages(id, domains)
      }
      const domain = new CreateBlogImage(body)
      return repository.createImages(id, [domain])
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createImage }
