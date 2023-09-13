const repository = require('src/infra/repositories/offer')

const getOffersWithReleasesComingSoon = (date,searchParams = {}) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getOffersWithReleasesComingSoon(date,searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getOffersWithReleasesComingSoon
};
