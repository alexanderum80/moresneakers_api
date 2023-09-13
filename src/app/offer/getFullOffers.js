const offerRepository = require('src/infra/repositories/offer')

const getFullOffers = (searchParams) => {
  return Promise
    .resolve()
    .then(() =>
      offerRepository.getFullOffersList(searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getFullOffers
}
