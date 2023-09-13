const repository = require('src/infra/repositories/release')

const getAllImages = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getAllImages(id)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getAllImages
}
