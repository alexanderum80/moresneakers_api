const repository = require('src/infra/repositories/style')

const linkShops = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body) {
        return repository.setShops(id, body)
      }
      return []
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { linkShops }
