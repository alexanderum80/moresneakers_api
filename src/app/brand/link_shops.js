const repository = require('../../infra/repositories/brand')

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
