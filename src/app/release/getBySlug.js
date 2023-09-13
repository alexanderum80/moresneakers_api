const repository = require('src/infra/repositories/release')

const getBySlug = (slug) => {
  return Promise
    .resolve()
    .then(() =>
      repository.findBySlugWithDetails(slug)
    )
    .catch(error => {
      throw new Error(error)
    })
}

const getJustOffersBySlug = (slug, searchParams) => {
  return Promise
    .resolve()
    .then(() =>
      repository.findOffersBySlug(slug, searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getBySlug,
  getJustOffersBySlug
}
