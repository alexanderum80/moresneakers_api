const repository = require('src/infra/repositories/style')

const getStylesByBrand = (brandId) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getStylesByBrand(brandId)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getStylesByBrand
}
