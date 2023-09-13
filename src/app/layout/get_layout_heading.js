const repository = require('src/infra/repositories/layout')

const getLayoutHeading = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getHeading(page)
    )
}

module.exports = {
  getLayoutHeading
}
