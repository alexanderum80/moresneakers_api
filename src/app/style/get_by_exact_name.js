const repository = require('src/infra/repositories/style')

const getByExactName = (slug) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getByName(slug)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getByExactName
}
