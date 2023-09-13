const repository = require('src/infra/repositories/release')

const getFullReleaseBySlug = (slug, searchParams = {}) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getFullReleaseBySlug(slug, searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getFullReleaseBySlug
};
