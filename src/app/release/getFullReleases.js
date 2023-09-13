const releaseRepository = require('src/infra/repositories/release')

const getFullReleases = (searchParams) => {
  return Promise
    .resolve()
    .then(() =>
      releaseRepository.getFullReleaseList(searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getFullReleases
}
