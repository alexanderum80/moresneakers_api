const repository = require('src/infra/repositories/collection')

const linkReleases = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body) {
        return repository.setReleases(id, body)
      }
      return []
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { linkReleases }
