const repository = require('src/infra/repositories/release')

const getByStatusGroup = (statusGroup, searchParams) => {
  return Promise
    .resolve()
    .then(() =>
      repository.findByStatusGroup(statusGroup, searchParams)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getByStatusGroup
}
