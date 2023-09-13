const repository = require('src/infra/repositories/shop')

const getCountries = () => {
  return Promise
    .resolve()
    .then(() =>
      repository.getCountries()
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getCountries
}
