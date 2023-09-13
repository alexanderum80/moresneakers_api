const repository = require('src/infra/repositories/collection')

const getLinkedReleases = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getReleases(id)
    ).then((releases) =>
      releases.map((release) => release.id)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getLinkedReleases
}
