const repository = require('src/infra/repositories/style')

const getPopularStyles = (brandId) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getPopularStyles(brandId)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getPopularStyles
}
