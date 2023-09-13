const repository = require('src/infra/repositories/release')

const remove = ({ id }) => {
  return Promise
    .resolve()
    .then(() =>
      repository.destroyImage(id)
    )
    .catch((error) => {
      throw new Error(error)
    })
}

module.exports = { remove }
