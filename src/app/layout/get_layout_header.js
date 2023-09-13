const repository = require('src/infra/repositories/layout')

const getLayoutHeader = (page) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getHeader(page)
    )
}

module.exports = {
  getLayoutHeader
}
