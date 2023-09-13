const repository = require('src/infra/repositories/offer')

const getOffersDropedInTheLast24h = (date,searchParams = {}) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getOffersDropedInTheLast24h(date,searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getOffersDropedInTheLast24h
};
